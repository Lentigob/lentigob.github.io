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
            <icon-svg name="bx-loader-alt" class="bx-spin"></icon-svg> Cargando proyectos...
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
                        <proyecto-row :item="p"></proyecto-row>
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
