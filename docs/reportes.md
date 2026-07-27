# Reportes Técnicos

Informes de avance y entregables del proyecto.

<div class="vue-mount">
<csv-loader src="data/Publicaciones_Datos.csv" filter-col="tipo" category="Reporte">
    <script type="text/template">
        <div v-show="loading" class="loading-state">
            <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargando reportes...
        </div>
        <div v-show="!loading">
            <div class="resource-filters" style="margin-bottom: 20px;">
                <input type="text" v-model="searchQuery" placeholder="Buscar reportes..." class="form-control" style="max-width: 400px;">
            </div>
            <div class="data-panel">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th @click="sortBy('titulo')">Reporte <span class="sort-icon">⇅</span></th>
                            <th @click="sortBy('anio')">Año <span class="sort-icon">⇅</span></th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.titulo">
                            <td>
                                <strong class="data-table__title">{{ item.titulo }}</strong>
                                <span class="data-table__subtitle">{{ 'Proyecto: ' + (item.proyecto || 'General') }}</span>
                            </td>
                            <td>{{ item.anio }}</td>
                            <td>
                                <a :href="item.url || '#'" target="_blank" class="data-action">
                                    <svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-download"></use></svg>
                                    PDF
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-show="items.length === 0" class="no-results">
                    No se encontraron reportes con los criterios seleccionados.
                </div>
            </div>
        </div>
    </script>
</csv-loader>
</div>
