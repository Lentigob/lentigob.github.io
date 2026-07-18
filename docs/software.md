# Software

Catálogo de desarrollos técnicos y soluciones de software.

<div x-data="dataLoader('data/Software.csv', 'producto', 'Todos')">
    <div class="filters">
        <div class="filter-group">
            <input type="text" x-model="searchQuery" placeholder="Buscar software, autor o proyecto..." class="form-control" style="max-width: 300px; display: inline-block;">
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
        <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargardo catálogo técnico...
    </div>
    <div x-show="!loading" class="data-panel">
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
                <template x-for="sw in items">
                    <tr>
                        <td>
                            <strong class="data-table__title" x-text="sw.nombre"></strong>
                            <span class="data-table__subtitle" x-text="sw.participantes"></span>
                        </td>
                        <td>
                            <span class="component-chip" x-text="sw.producto"></span>
                        </td>
                        <td>
                            <span class="badge badge-gray badge-outline" x-text="sw.madureztecnologica"></span>
                        </td>
                        <td>
                            <span class="badge" :class="{
                                'badge-green': sw.etapa.toLowerCase() === 'terminado',
                                'badge-yellow': sw.etapa.toLowerCase() === 'activo',
                                'badge-red': sw.etapa.toLowerCase() === 'pausado'
                            }" x-text="sw.etapa"></span>
                        </td>
                        <td>
                            <a :href="'https://github.com/Lentigob/' + sw.nombre" target="_blank" class="data-action">
                                <svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-code-alt"></use></svg>
                                Código
                            </a>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div x-show="items.length === 0" class="no-results">
            No se encontraron herramientas con los criterios seleccionados.
        </div>
    </div>
</div>

