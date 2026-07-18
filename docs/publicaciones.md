# Publicaciones

Listado de artículos científicos, libros y conferencias.

<div x-data="dataLoader('data/Publicaciones_Datos.csv', 'tipo', 'Todos')">
    <div class="filters">
        <div class="filter-group">
            <input type="text" x-model="searchQuery" placeholder="Buscar título, autor..." class="form-control" style="max-width: 300px; display: inline-block;">
            <select x-model="selectedYear" class="form-control" style="max-width: 150px; display: inline-block;">
                <template x-for="year in years">
                    <option :value="year" x-text="year === 'Todos' ? 'Todos los años' : year"></option>
                </template>
            </select>
        </div>
        <div class="filters__tags">
            <template x-for="cat in categories">
                <button 
                    @click="activeCategory = cat" 
                    :class="{'active': activeCategory === cat}"
                    class="filter-chip"
                    x-text="cat">
                </button>
            </template>
        </div>
    </div>
    <div x-show="loading" class="loading-state">
        <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargando publicaciones...
    </div>
    <div x-show="!loading" class="data-panel">
        <table class="data-table">
            <thead>
                <tr>
                    <th @click="sortBy('titulo')">Referencia <span class="sort-icon">⇅</span></th>
                    <th @click="sortBy('tipo')">Tipo <span class="sort-icon">⇅</span></th>
                    <th @click="sortBy('anio')">Año <span class="sort-icon">⇅</span></th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <template x-for="item in items">
                    <tr>
                        <td>
                            <strong class="data-table__title" x-text="item.titulo"></strong>
                            <span class="data-table__subtitle" x-text="item.autores"></span>
                            <span class="data-table__subtitle" style="font-style: italic;" x-text="item.revistaeditorial"></span>
                        </td>
                        <td><span class="badge badge-blue" x-text="item.tipo"></span></td>
                        <td><span x-text="item.anio"></span></td>
                        <td>
                            <a :href="item.url" target="_blank" class="data-action">
                                <svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-link-external"></use></svg>
                                DOI
                            </a>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div x-show="items.length === 0" class="no-results">
            No se encontraron publicaciones con los criterios seleccionados.
        </div>
    </div>
</div>
