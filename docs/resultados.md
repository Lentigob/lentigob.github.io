# Resultados

Reportes, publicaciones, datos abiertos y software desarrollado por el laboratorio.

<div class="vue-mount">
<csv-loader src="data/Publicaciones_Datos.csv,data/Software.csv"
            filter-col="tipo" category="Todos"
            src-category=",Software"
            category-map='{"Reporte":"Reportes","Dataset":"Datos","Artículo":"Publicaciones","Libro":"Publicaciones","Ponencia":"Publicaciones"}'>
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
            <icon-svg name="bx-loader-alt" class="bx-spin"></icon-svg> Cargando resultados...
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
                    <tr v-for="item in items" :key="(item.titulo || item.nombre) + item.anio">
                        <resultado-row :item="item"></resultado-row>
                    </tr>
                </tbody>
            </table>
            <div v-show="items.length === 0" class="no-results">
                No se encontraron resultados con los criterios seleccionados.
            </div>
        </div>
    </script>
</csv-loader>
</div>
