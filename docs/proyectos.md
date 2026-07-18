# Proyectos

Proyectos de investigación y desarrollo técnico.

<div x-data="dataLoader('data/Proyectos.csv', 'lineainv', 'Todos')">
    <div class="filters">
        <div class="filter-group">
            <input type="text" x-model="searchQuery" placeholder="Buscar proyecto o investigador..." class="form-control" style="max-width: 300px; display: inline-block;">
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
        <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargando proyectos...
    </div>
    <div x-show="!loading" class="data-panel">
        <table class="data-table">
            <thead>
                <tr>
                    <th @click="sortBy('titulo')">Proyecto <span class="sort-icon">⇅</span></th>
                    <th @click="sortBy('institucion')">Entidad <span class="sort-icon">⇅</span></th>
                    <th @click="sortBy('avance')">Avance <span class="sort-icon">⇅</span></th>
                    <th @click="sortBy('situacion')">Estado <span class="sort-icon">⇅</span></th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <template x-for="p in items">
                    <tr>
                        <td>
                            <strong class="data-table__title" x-text="p.titulo"></strong>
                            <span class="data-table__subtitle" x-text="'Investigadores: ' + p.investigadores"></span>
                        </td>
                        <td>
                            <span class="badge badge-blue" x-text="p.institucion"></span>
                        </td>
                        <td style="min-width: 120px;">
                            <div class="progress-track">
                                <div class="progress-fill" :style="'width: ' + p.avance"></div>
                            </div>
                            <span style="font-size: 0.75rem; color: #64748b;" x-text="p.avance"></span>
                        </td>
                        <td>
                            <span class="badge" :class="{
                                'badge-green': p.situacion.toLowerCase() === 'terminado',
                                'badge-yellow': p.situacion.toLowerCase() === 'activo',
                                'badge-red': p.situacion.toLowerCase() === 'pausado'
                            }" x-text="p.situacion"></span>
                        </td>
                        <td>
                            <a :href="p.url" class="data-action">
                                <svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-right-arrow-alt"></use></svg>
                                Detalles
                            </a>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div x-show="items.length === 0" class="no-results">
            No se encontraron proyectos con los criterios seleccionados.
        </div>
    </div>
</div>
