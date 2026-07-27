# Software

Catálogo de desarrollos técnicos y soluciones de software.

<div class="vue-mount">
<csv-loader src="data/Software.csv" filter-col="producto" category="Todos">
    <script type="text/template">
        <div class="filters">
            <div class="filter-group">
                <input type="text" v-model="searchQuery" placeholder="Buscar software, autor o proyecto..." class="form-control" style="max-width: 300px; display: inline-block;">
                <select v-model="selectedYear" class="form-control" style="max-width: 150px; display: inline-block;">
                    <option v-for="year in years" :value="year">{{ year === 'Todos' ? 'Todos los años' : year }}</option>
                </select>
            </div>
            <div class="filters__tags">
                <button v-for="cat in categories" @click="activeCategory = cat" :class="{'active': activeCategory === cat}" class="filter-chip">{{ cat }}</button>
            </div>
        </div>
        <div v-show="loading" class="loading-state">
            <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargardo catálogo técnico...
        </div>
        <div v-show="!loading" class="data-panel">
            <table class="data-table">
                <thead>
                    <tr>
                        <th @click="sortBy('nombre')">Software <span class="sort-icon">⇅</span></th>
                        <th @click="sortBy('producto')">Tipo <span class="sort-icon">⇅</span></th>
                        <th @click="sortBy('madureztecnologica')">Madurez <span class="sort-icon">⇅</span></th>
                        <th @click="sortBy('etapa')">Estado <span class="sort-icon">⇅</span></th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sw in items" :key="sw.nombre">
                        <td>
                            <strong class="data-table__title">{{ sw.nombre }}</strong>
                            <span class="data-table__subtitle">{{ sw.participantes }}</span>
                        </td>
                        <td>
                            <span class="component-chip">{{ sw.producto }}</span>
                        </td>
                        <td>
                            <span class="badge badge-gray badge-outline">{{ sw.madureztecnologica }}</span>
                        </td>
                        <td>
                            <span class="badge" :class="{
                                'badge-green': sw.etapa.toLowerCase() === 'terminado',
                                'badge-yellow': sw.etapa.toLowerCase() === 'activo',
                                'badge-red': sw.etapa.toLowerCase() === 'pausado'
                            }">{{ sw.etapa }}</span>
                        </td>
                        <td>
                            <a :href="'https://github.com/Lentigob/' + sw.nombre" target="_blank" class="data-action">
                                <svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-code-alt"></use></svg>
                                Código
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-show="items.length === 0" class="no-results">
                No se encontraron herramientas con los criterios seleccionados.
            </div>
        </div>
    </script>
</csv-loader>
</div>
