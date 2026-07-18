document.addEventListener('alpine:init', () => {
    // Global configuration for Marked
    marked.setOptions({
        breaks: true,
        gfm: true
    });

    /**
     * Shared helper to process markdown inside a container
     * Handles unescaping, dedenting, and SVG unwrapping.
     */
    const processMarkdownContainer = (container) => {
        let rawMd = container.innerHTML
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/^[ \t]+/gm, '') // Strip leading whitespace from every line
            .trim();
        
        if (!rawMd) return;
        
        let html = marked.parse(rawMd);
        // Unwrap SVGs from accidental <p> tags created by the parser
        container.innerHTML = html.replace(/<p>\s*(<svg[\s\S]*?<\/svg>)\s*<\/p>/g, '$1');
    };

    Alpine.data('dataLoader', (url, filterCol = '', initialCategory = 'Todos', baseFilter = null) => ({
        url,
        filterCol,
        rawItems: [],
        items: [],
        categories: ['Todos'],
        activeCategory: initialCategory,
        searchQuery: '',
        contentBlueprint: '',
        contentContainer: '',
        loading: true,
        baseFilter, // e.g. { estado: 'activo' }
        sortKey: '',
        sortAsc: true,
        selectedYear: 'Todos',

        async init() {
            const blueprintEl = this.$el.querySelector('.blueprint');
            const containerEl = this.$el.querySelector('.content-container');

            // Obteniendo la plantilla de la tarjeta desde el HTML y eliminándola del DOM para evitar duplicados
            if (blueprintEl) {
                this.contentBlueprint = blueprintEl.innerHTML; // Use innerHTML directly to preserve formatting
                
                blueprintEl.remove();
            }

            // Obteniendo el contenedor para mostrar los datos del CSV
            if (containerEl) {
                this.contentContainer = containerEl;
            }
            
            try {
                const res = await fetch(this.url);
                const text = await res.text();
                Papa.parse(text, {
                    header: true,
                    skipEmptyLines: 'greedy',
                    transformHeader: (h) => h.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ""),
                    complete: (results) => {
                        this.rawItems = results.data.map(item => {
                            // Normalize keys and extract year for sorting/filtering
                            const normalized = {};
                            Object.keys(item).forEach(k => {
                                normalized[k] = item[k];
                            });
                            
                            // Auto-extract year from common date fields if not present
                            if (!normalized.anio) {
                                const dateVal = normalized.ano || normalized.fecha || normalized.fechainicio || normalized.publicacion || '';
                                normalized.anio = dateVal ? String(dateVal).trim().substring(0, 4) : '';
                            }
                            return normalized;
                        });

                        if (this.filterCol) {
                            const col = this.filterCol.toLowerCase().replace(/\s+/g, "");
                            const unique = [...new Set(this.rawItems.map(i => i[col]))].filter(Boolean);
                            this.categories = ['Todos', ...unique.sort()];
                        }
                        this.applyFilters();
                        this.loading = false;
                    }
                });
            } catch (e) {
                console.error("Error al cargar los datos:", e);
                this.loading = false;
            }

            // Watch for changes in filters and search
            this.$watch('activeCategory', () => this.applyFilters());
            this.$watch('searchQuery', () => this.applyFilters());
            this.$watch('selectedYear', () => this.applyFilters());
            this.$watch('sortKey', () => this.applyFilters());
            this.$watch('sortAsc', () => this.applyFilters());
        },

        get years() {
            const yearsSet = new Set(this.rawItems.map(i => i.anio).filter(Boolean));
            return ['Todos', ...Array.from(yearsSet).sort().reverse()];
        },

        sortBy(key) {
            if (this.sortKey === key) {
                this.sortAsc = !this.sortAsc;
            } else {
                this.sortKey = key;
                this.sortAsc = true;
            }
        },

        applyFilters() {
            let filtered = this.rawItems;

            // 1. Apply base filter (hidden global filter like estado='activo')
            if (this.baseFilter) {
                Object.keys(this.baseFilter).forEach(key => {
                    const k = key.toLowerCase().replace(/\s+/g, "");
                    const val = String(this.baseFilter[key]).toLowerCase();
                    filtered = filtered.filter(i => String(i[k]).toLowerCase() === val);
                });
            }

            // 2. Apply category filter
            if (this.filterCol && this.activeCategory !== 'Todos') {
                const col = this.filterCol.toLowerCase().replace(/\s+/g, "");
                if (Array.isArray(this.activeCategory)) {
                    filtered = filtered.filter(i => this.activeCategory.includes(i[col]));
                } else {
                    filtered = filtered.filter(i => i[col] === this.activeCategory);
                }
            }

            // 3. Apply year filter
            if (this.selectedYear !== 'Todos') {
                filtered = filtered.filter(i => i.anio === this.selectedYear);
            }

            // 4. Apply search query
            if (this.searchQuery.trim()) {
                const q = this.searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                filtered = filtered.filter(item => 
                    Object.values(item).some(v => 
                        String(v).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(q)
                    )
                );
            }

            // 5. Apply sorting
            if (this.sortKey) {
                filtered = [...filtered].sort((a, b) => {
                    const av = a[this.sortKey], bv = b[this.sortKey];
                    const an = parseFloat(av), bn = parseFloat(bv);
                    let res = (!isNaN(an) && !isNaN(bn)) ? an - bn : String(av).localeCompare(String(bv));
                    return this.sortAsc ? res : -res;
                });
            }

            this.items = filtered;
        },

        render(item) {
            if (!this.contentBlueprint) return '';
            
            // 1. Global Variable Replacement
            // We do this on the raw string first so attributes (src, href) are filled 
            // before the browser tries to parse the HTML.
            let html = this.replaceVars(this.contentBlueprint, item);

            // 2. Create temporary DOM to process Markdown blocks
            const temp = document.createElement('div');
            temp.innerHTML = html;

            // 3. Process .blueprint-markdown blocks using the shared helper
            const mdContainers = temp.querySelectorAll('.blueprint-markdown, .markdown-content');
            mdContainers.forEach(container => processMarkdownContainer(container));

            return temp.innerHTML;
        },

        // Helper function for variable replacement
        replaceVars(text, item) {
            if (!text) return '';
            return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, key) => {
                const k = key.toLowerCase();
                if (k === 'foto_auto') {
                    const name = item.nombre || item.name || item.titulo || item.title || 'default';
                    return name.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
                }
                const value = k.split('.').reduce((obj, i) => (obj ? obj[i] : null), item);
                return value !== null && value !== undefined ? value : '';
            });
        }
    }));

    /**
     * Small helper to process markdown inside elements that aren't loaded from CSV
     * Usage: <div x-data="mdProcessor"> ... <div class="markdown-content">### Title</div> ... </div>
     */
    Alpine.data('mdProcessor', () => ({
        init() {
            // Find all markdown containers inside this component
            const containers = this.$el.querySelectorAll('.markdown-content, .blueprint-markdown');
            containers.forEach(container => processMarkdownContainer(container));
        }
    }));

});
