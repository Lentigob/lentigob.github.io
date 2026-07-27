# Publicaciones

Listado de artículos científicos, libros y conferencias.

<div class="vue-mount">
<csv-loader src="data/Publicaciones_Datos.csv" filter-col="tipo" category="Todos">
    <script type="text/template">
        <div class="filters">
            <div class="filter-group">
                <input type="text" v-model="searchQuery" placeholder="Buscar título, autor..." class="form-control" style="max-width: 300px; display: inline-block;">
                <select v-model="selectedYear" class="form-control" style="max-width: 150px; display: inline-block;">
                    <option v-for="year in years" :value="year">{{ year === 'Todos' ? 'Todos los años' : year }}</option>
                </select>
            </div>
            <div class="filters__tags">
                <button v-for="cat in categories" @click="activeCategory = cat" :class="{'active': activeCategory === cat}" class="filter-chip">{{ cat }}</button>
            </div>
        </div>
        <div v-show="loading" class="loading-state">
            <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargando publicaciones...
        </div>
        <div v-show="!loading" class="data-panel">
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
                    <tr v-for="item in items" :key="item.titulo">
                        <td>
                            <strong class="data-table__title">{{ item.titulo }}</strong>
                            <span class="data-table__subtitle">{{ item.autores }}</span>
                            <span class="data-table__subtitle" style="font-style: italic;">{{ item.revistaeditorial }}</span>
                        </td>
                        <td><span class="badge badge-blue">{{ item.tipo }}</span></td>
                        <td>{{ item.anio }}</td>
                        <td>
                            <a :href="item.url" target="_blank" class="data-action">
                                <svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-link-external"></use></svg>
                                DOI
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-show="items.length === 0" class="no-results">
                No se encontraron publicaciones con los criterios seleccionados.
            </div>
        </div>
    </script>
</csv-loader>
</div>
