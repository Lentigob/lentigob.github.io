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
// Columna "excluir" (opcional, primera columna del CSV): cualquier fila cuyo
//   valor no esté vacío (p.ej. "x") se descarta antes de mostrarse - permite
//   marcar datos privados/confidenciales dentro del mismo CSV en vez de
//   mantener un archivo "_privado" aparte.
//
// Atributos:
//   src (requerido; admite varios CSV separados por comas, p.ej.
//     "data/A.csv,data/B.csv" - las filas de todos se combinan en una sola
//     lista de items), filter-col, category (valor inicial de
//     activeCategory, acepta lista separada por comas), base-filter (JSON,
//     filtro fijo oculto, p.ej. '{"estado":"activo"}'), empty-message (no se
//     usa directamente aquí; el "no hay resultados" se controla en la
//     plantilla con v-show="items.length === 0"), sort-key (columna de orden
//     inicial, por defecto "anio"), sort-asc ("true"/"false", por defecto
//     false). Las filas sin valor en la columna de orden siempre quedan al
//     final, sin importar la dirección (útil para "prioridad" sin asignar).
//
// Para combinar varios CSV con columnas distintas en una sola vista con
// pestañas de categoría (p.ej. Resultados = Reportes + Publicaciones + Datos
// + Software, donde Software.csv no tiene columna "Tipo"):
//   src-category: lista separada por comas, en el mismo orden que "src". Da
//     un valor de categoría por defecto a las filas de esa fuente cuando les
//     falta la columna de "filter-col" (p.ej. "" para el CSV que ya trae
//     Tipo, "Software" para el que no).
//   category-map: JSON que renombra valores crudos de "filter-col" a la
//     categoría que se muestra/filtra, p.ej.
//     '{"Reporte":"Reportes","Dataset":"Datos","Artículo":"Publicaciones","Libro":"Publicaciones","Ponencia":"Publicaciones"}'
//     Los valores no listados se quedan igual (útil para "Software", que ya
//     llega con el nombre de categoría final vía src-category).
(function () {
  function normalizeKey(key) {
    return key
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, '');
  }

  function fetchAndParseCsv(url) {
    return fetch(url)
      .then((res) => res.text())
      .then(
        (rawText) =>
          // Normaliza saltos de línea antes de parsear: Papa.parse detecta un
          // único estilo (\r\n o \n) para todo el archivo, así que un CSV
          // editado a mano con estilos mezclados (típico al editar en Excel
          // vs. otro editor) corrompe silenciosamente las filas del otro estilo.
          rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
      )
      .then(
        (text) =>
          new Promise((resolve, reject) => {
            Papa.parse(text, {
              header: true,
              skipEmptyLines: 'greedy',
              transformHeader: normalizeKey,
              complete: (results) => resolve(results.data),
              error: reject
            });
          })
      );
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

      const defaultSortKey = this.getAttribute('sort-key') || 'anio';
      const defaultSortAsc = this.getAttribute('sort-asc') === 'true';

      const baseFilterAttr = this.getAttribute('base-filter');
      let baseFilter = null;
      if (baseFilterAttr) {
        try {
          baseFilter = JSON.parse(baseFilterAttr);
        } catch (e) {
          console.error('csv-loader: "base-filter" no es JSON válido:', baseFilterAttr, e);
        }
      }

      const sources = src ? src.split(',').map((s) => s.trim()).filter(Boolean) : [];
      const srcCategoryAttr = this.getAttribute('src-category') || '';
      const srcCategories = srcCategoryAttr.split(',').map((s) => s.trim());

      const categoryMapAttr = this.getAttribute('category-map');
      let categoryMap = null;
      if (categoryMapAttr) {
        try {
          categoryMap = JSON.parse(categoryMapAttr);
        } catch (e) {
          console.error('csv-loader: "category-map" no es JSON válido:', categoryMapAttr, e);
        }
      }

      const templateEl = this.querySelector('script[type="text/template"]');
      const template = templateEl ? templateEl.textContent.trim() : '';
      if (templateEl) templateEl.remove();

      if (!sources.length || !template) {
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
            sortKey: defaultSortKey,
            sortAsc: defaultSortAsc,
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
                const aEmpty = av === undefined || av === null || String(av).trim() === '';
                const bEmpty = bv === undefined || bv === null || String(bv).trim() === '';
                // Las filas sin valor en la columna ordenada siempre van al final,
                // sin importar la dirección (p.ej. "Prioridad" vacía = sin asignar).
                if (aEmpty || bEmpty) {
                  if (aEmpty && bEmpty) return 0;
                  return aEmpty ? 1 : -1;
                }
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
            const col = filterCol ? normalizeKey(filterCol) : '';

            const rowsPerSource = await Promise.all(sources.map((url) => fetchAndParseCsv(url)));

            const merged = [];
            rowsPerSource.forEach((rows, i) => {
              const defaultCategory = srcCategories[i];
              rows.forEach((row) => {
                if (row.excluir && row.excluir.trim()) return;
                if (defaultCategory && col && !row[col]) {
                  row[col] = defaultCategory;
                }
                merged.push(row);
              });
            });

            this.rawItems = merged.map((item) => {
              if (!item.anio) {
                const dateVal = item.ano || item.fecha || item.fechainicio || item.publicacion || '';
                item.anio = dateVal ? String(dateVal).trim().substring(0, 4) : '';
              }
              if (categoryMap && col && categoryMap[item[col]]) {
                item[col] = categoryMap[item[col]];
              }
              return item;
            });

            if (col) {
              const unique = [...new Set(this.rawItems.map((i) => i[col]))].filter(Boolean);
              this.categories = ['Todos', ...unique.sort()];
            }

            this.applyFilters();
            this.loading = false;
          } catch (e) {
            console.error('csv-loader: error al cargar el CSV', sources, e);
            this.loading = false;
          }
        }
      });

      // Por defecto Vue "condensa" (colapsa) los espacios en blanco de los
      // nodos de texto de la plantilla. Eso destruye los saltos de línea
      // "duros" de Markdown (dos espacios + salto) si alguien escribe
      // Markdown directo como texto de un <md-content>. "preserve" lo evita.
      app.config.compilerOptions.whitespace = 'preserve';
      window.registerAppComponents(app);

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
