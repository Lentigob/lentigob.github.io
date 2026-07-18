# Reportes Técnicos

Informes de avance y entregables del proyecto.

<div x-data="dataLoader('data/Publicaciones_Datos.csv', 'tipo', 'Reporte')">
  <div x-show="loading" class="loading-state">
    <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargando reportes...
  </div>
  <div x-show="!loading">
    <div class="resource-filters" style="margin-bottom: 20px;">
      <input type="text" x-model="searchQuery" placeholder="Buscar reportes..." class="form-control" style="max-width: 400px;">
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
                <template x-for="item in items">
                    <tr>
                        <td>
                            <strong class="data-table__title" x-text="item.titulo"></strong>
                            <span class="data-table__subtitle" x-text="'Proyecto: ' + (item.proyecto || 'General')"></span>
                        </td>
                        <td><span x-text="item.anio"></span></td>
                        <td>
                            <a :href="item.url || '#'" target="_blank" class="data-action">
                                <svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-download"></use></svg>
                                PDF
                            </a>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div x-show="items.length === 0" class="no-results">
            No se encontraron reportes con los criterios seleccionados.
        </div>
    </div>
  </div>
</div>

