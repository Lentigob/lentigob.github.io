# Datos Abiertos

Conjuntos de datos, corpus y recursos de información.

<div x-data="dataLoader('data/Publicaciones_Datos.csv', 'tipo', 'Dataset')">
    <div class="filters">
        <div class="filter-group">
            <input type="text" x-model="searchQuery" placeholder="Buscar datos o proyectos..." class="form-control" style="max-width: 300px; display: inline-block;">
            <select x-model="selectedYear" class="form-control" style="max-width: 150px; display: inline-block;">
                <template x-for="year in years">
                    <option :value="year" x-text="year === 'Todos' ? 'Todos los años' : year"></option>
                </template>
            </select>
        </div>
    </div>
    <div x-show="loading" class="loading-state">
        <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargando datasets...
    </div>
    <div x-show="!loading" class="data-panel">
        <table class="data-table">
            <thead>
                <tr>
                    <th @click="sortBy('titulo')">Dataset <span class="sort-icon">⇅</span></th>
                    <th @click="sortBy('revistaeditorial')">Repositorio <span class="sort-icon">⇅</span></th>
                    <th @click="sortBy('anio')">Año <span class="sort-icon">⇅</span></th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <template x-for="item in items">
                    <tr>
                        <td>
                            <strong class="data-table__title" x-text="item.titulo"></strong>
                            <span class="data-table__subtitle" x-text="'Proyecto: ' + item.proyecto"></span>
                        </td>
                        <td>
                            <span class="component-chip" x-text="item.revistaeditorial"></span>
                        </td>
                        <td><span x-text="item.anio"></span></td>
                        <td>
                            <a :href="item.url" target="_blank" class="data-action">
                                <svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-data"></use></svg>
                                Acceder
                            </a>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div x-show="items.length === 0" class="no-results">
            No se encontraron datasets con los criterios seleccionados.
        </div>
    </div>
</div>

