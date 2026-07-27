// <csv-loader> - Web Component nativo que carga un CSV y monta UNA sola
// aplicación de Vue sobre todo su contenido (filtros, tabla o tarjetas).
//
// Uso:
//   <csv-loader src="data/Proyectos.csv" filter-col="lineainv" category="Todos">
//     <script type="text/template">
//       <div class="filters">
//         <input v-model="searchQuery" ...>
//         <select v-model="selectedYear">
//           <option v-for="year in years" :value="year">{{ year }}</option>
//         </select>
//         <button v-for="cat in categories" @click="activeCategory = cat">{{ cat }}</button>
//       </div>
//       <div v-show="loading">Cargando...</div>
//       <table v-show="!loading">
//         <tr v-for="item in items">...</tr>
//       </table>
//     </script>
//   </csv-loader>
//
// Datos/métodos expuestos a la plantilla:
//   rawItems, items, categories, years, activeCategory, selectedYear,
//   searchQuery, sortKey, sortAsc, loading, sortBy(key)
//
// Atributos:
//   src (requerido), filter-col, category (valor inicial de activeCategory,
//   acepta lista separada por comas), base-filter (JSON, filtro fijo oculto,
//   p.ej. '{"estado":"activo"}'), empty-message (no se usa directamente aquí;
//   el "no hay resultados" se controla en la plantilla con v-show="items.length === 0"
//   igual que con Alpine).
(function () {
  function normalizeKey(key) {
    return key
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, '');
  }

  class CsvLoader extends HTMLElement {
    async connectedCallback() {
      if (this._initialized) return;
      this._initialized = true;

      const src = this.getAttribute('src');
      const filterCol = this.getAttribute('filter-col') || '';
      const categoryAttr = this.getAttribute('category') || 'Todos';
      const initialCategory = categoryAttr.includes(',')
        ? categoryAttr.split(',').map((s) => s.trim())
        : categoryAttr;

      const baseFilterAttr = this.getAttribute('base-filter');
      let baseFilter = null;
      if (baseFilterAttr) {
        try {
          baseFilter = JSON.parse(baseFilterAttr);
        } catch (e) {
          console.error('csv-loader: "base-filter" no es JSON válido:', baseFilterAttr, e);
        }
      }

      const templateEl = this.querySelector('script[type="text/template"]');
      const template = templateEl ? templateEl.textContent.trim() : '';
      if (templateEl) templateEl.remove();

      if (!src || !template) {
        console.error('csv-loader: se requieren los atributos "src" y una <script type="text/template"> hija.');
        return;
      }

      this.innerHTML = '';

      const app = Vue.createApp({
        template,
        data() {
          return {
            rawItems: [],
            items: [],
            categories: ['Todos'],
            activeCategory: initialCategory,
            searchQuery: '',
            loading: true,
            sortKey: '',
            sortAsc: true,
            selectedYear: 'Todos'
          };
        },
        computed: {
          years() {
            const yearsSet = new Set(this.rawItems.map((i) => i.anio).filter(Boolean));
            return ['Todos', ...Array.from(yearsSet).sort().reverse()];
          }
        },
        methods: {
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

            if (baseFilter) {
              Object.keys(baseFilter).forEach((key) => {
                const k = normalizeKey(key);
                const val = String(baseFilter[key]).toLowerCase();
                filtered = filtered.filter((i) => String(i[k]).toLowerCase() === val);
              });
            }

            if (filterCol && this.activeCategory !== 'Todos') {
              const col = normalizeKey(filterCol);
              filtered = Array.isArray(this.activeCategory)
                ? filtered.filter((i) => this.activeCategory.includes(i[col]))
                : filtered.filter((i) => i[col] === this.activeCategory);
            }

            if (this.selectedYear !== 'Todos') {
              filtered = filtered.filter((i) => i.anio === this.selectedYear);
            }

            if (this.searchQuery.trim()) {
              const q = this.searchQuery
                .toLowerCase()
                .normalize('NFD')
                .replace(/[̀-ͯ]/g, '');
              filtered = filtered.filter((item) =>
                Object.values(item).some((v) =>
                  String(v)
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[̀-ͯ]/g, '')
                    .includes(q)
                )
              );
            }

            if (this.sortKey) {
              const key = this.sortKey;
              const asc = this.sortAsc;
              filtered = [...filtered].sort((a, b) => {
                const av = a[key];
                const bv = b[key];
                const an = parseFloat(av);
                const bn = parseFloat(bv);
                const res = !isNaN(an) && !isNaN(bn) ? an - bn : String(av).localeCompare(String(bv));
                return asc ? res : -res;
              });
            }

            this.items = filtered;
          }
        },
        watch: {
          activeCategory() {
            this.applyFilters();
          },
          searchQuery() {
            this.applyFilters();
          },
          selectedYear() {
            this.applyFilters();
          },
          sortKey() {
            this.applyFilters();
          },
          sortAsc() {
            this.applyFilters();
          }
        },
        async mounted() {
          try {
            const res = await fetch(src);
            const rawText = await res.text();
            // Normaliza saltos de línea antes de parsear: Papa.parse detecta
            // un único estilo (\r\n o \n) para todo el archivo, así que un CSV
            // editado a mano con estilos mezclados (típico al editar en Excel
            // vs. otro editor) corrompe silenciosamente las filas del otro estilo.
            const text = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            Papa.parse(text, {
              header: true,
              skipEmptyLines: 'greedy',
              transformHeader: normalizeKey,
              complete: (results) => {
                this.rawItems = results.data.map((item) => {
                  if (!item.anio) {
                    const dateVal = item.ano || item.fecha || item.fechainicio || item.publicacion || '';
                    item.anio = dateVal ? String(dateVal).trim().substring(0, 4) : '';
                  }
                  if (!item.foto_auto) {
                    const name = item.nombre || item.name || item.titulo || item.title || 'default';
                    item.foto_auto = name
                      .toLowerCase()
                      .trim()
                      .normalize('NFD')
                      .replace(/[̀-ͯ]/g, '')
                      .replace(/\s+/g, '-');
                  }
                  return item;
                });

                if (filterCol) {
                  const col = normalizeKey(filterCol);
                  const unique = [...new Set(this.rawItems.map((i) => i[col]))].filter(Boolean);
                  this.categories = ['Todos', ...unique.sort()];
                }

                this.applyFilters();
                this.loading = false;
              }
            });
          } catch (e) {
            console.error('csv-loader: error al cargar el CSV', src, e);
            this.loading = false;
          }
        }
      });

      // Por defecto Vue "condensa" (colapsa) los espacios en blanco de los
      // nodos de texto de la plantilla. Eso destruye los saltos de línea
      // "duros" de Markdown (dos espacios + salto) si alguien escribe
      // Markdown directo como texto de un <md-content>. "preserve" lo evita.
      app.config.compilerOptions.whitespace = 'preserve';

      this._app = app;
      app.mount(this);
    }

    disconnectedCallback() {
      if (this._app) {
        this._app.unmount();
        this._app = null;
      }
      this._initialized = false;
    }
  }

  customElements.define('csv-loader', CsvLoader);
})();
