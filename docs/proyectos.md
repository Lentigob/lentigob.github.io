# Proyectos

Proyectos de investigación y desarrollo técnico.

<div class="vue-mount">
<csv-loader src="data/Proyectos.csv" filter-col="lineainv" category="Todos">
    <script type="text/template">
        <div class="filters">
            <div class="filter-group">
                <input type="text" v-model="searchQuery" placeholder="Buscar proyecto o investigador..." class="form-control" style="max-width: 300px; display: inline-block;">
                <select v-model="selectedYear" class="form-control" style="max-width: 150px; display: inline-block;">
                    <option v-for="year in years" :value="year">{{ year === 'Todos' ? 'Todos los años' : year }}</option>
                </select>
            </div>
            <div class="filters__tags">
                <button v-for="cat in categories" @click="activeCategory = cat" :class="{'active': activeCategory === cat}" class="filter-chip">{{ cat }}</button>
            </div>
        </div>
        <div v-show="loading" class="loading-state">
            <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargando proyectos...
        </div>
        <div v-show="!loading" class="data-panel">
            <table class="data-table">
                <thead>
                    <tr>
                        <th style="width: 64px;"></th>
                        <th @click="sortBy('titulo')">Proyecto <span class="sort-icon">⇅</span></th>
                        <th @click="sortBy('institucion')">Entidad <span class="sort-icon">⇅</span></th>
                        <th @click="sortBy('avance')">Avance <span class="sort-icon">⇅</span></th>
                        <th @click="sortBy('situacion')">Estado <span class="sort-icon">⇅</span></th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in items" :key="p.titulo">
                        <td>
                            <a v-if="p.imagen" :href="p.imagen" target="_blank" title="Ver imagen completa">
                                <img :src="p.imagen" :alt="p.titulo" class="data-table__thumbnail" @error="$event.target.parentElement.style.display='none'">
                            </a>
                        </td>
                        <td>
                            <strong class="data-table__title">{{ p.titulo }}</strong>
                            <span class="data-table__subtitle">{{ 'Investigadores: ' + p.investigadores }}</span>
                        </td>
                        <td>
                            <span class="badge badge-blue">{{ p.institucion }}</span>
                        </td>
                        <td style="min-width: 120px;">
                            <div class="progress-track">
                                <div class="progress-fill" :style="'width: ' + p.avance"></div>
                            </div>
                            <span style="font-size: 0.75rem; color: #64748b;">{{ p.avance }}</span>
                        </td>
                        <td>
                            <span class="badge" :class="{
                                'badge-green': p.situacion.toLowerCase() === 'terminado',
                                'badge-yellow': p.situacion.toLowerCase() === 'activo',
                                'badge-red': p.situacion.toLowerCase() === 'pausado'
                            }">{{ p.situacion }}</span>
                        </td>
                        <td>
                            <a v-if="p.url" :href="p.url" class="data-action">
                                <svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-right-arrow-alt"></use></svg>
                                Detalles
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-show="items.length === 0" class="no-results">
                No se encontraron proyectos con los criterios seleccionados.
            </div>
        </div>
    </script>
</csv-loader>
</div>
