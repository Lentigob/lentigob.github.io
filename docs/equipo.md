# Equipo de Trabajo

A continuación presentamos al equipo de investigadores y colaboradores de nuestro laboratorio.

<div class="vue-mount">
<csv-loader src="data/Equipo.csv" filter-col="Tipo" category="Investigador"
            base-filter='{"estado":"activo"}'>
    <script type="text/template">
        <div v-show="loading" class="loading-state">Cargando...</div>
        <template v-if="!loading && items.length > 0">
            <h2>Investigadores Principales</h2>
            <div class="layout-grid">
                <card-block v-for="item in items" :key="item.nombre">
                    <template #image>
                        <a v-if="item.url || item.imagen" :href="item.url ? $toHref(item.url) : item.imagen" target="_blank" :title="item.url ? 'Ver contacto' : 'Ver imagen completa'" class="team-image-container">
                            <img src="assets/img/logo.png" class="image-placeholder">
                            <img v-if="item.imagen" :src="item.imagen" :alt="item.nombre" class="image-photo" @error="$event.target.style.display='none'">
                        </a>
                        <div v-else class="team-image-container">
                            <img src="assets/img/logo.png" class="image-placeholder">
                        </div>
                    </template>
                    <contact-icons :item="item" :fields="[
                        { key: 'url', title: 'Contacto' },
                        { key: 'contacto', icon: 'bx-envelope', title: 'Correo' },
                        { key: 'linkedin', icon: 'bx-linkedin', title: 'LinkedIn' },
                        { key: 'pagina', icon: 'bx-link-alt', title: 'Página' }
                    ]"></contact-icons>
                    <div class="card-separator"></div>
                    <md-content class="card-content">
                        #### {{ item.url ? '[' + item.nombre + '](' + $toHref(item.url) + ')' : item.nombre }}
                        **{{ item.rol }}**
                        *{{ item.institucion }}*
                        {{ item.departamento }}
                    </md-content>
                </card-block>
            </div>
        </template>
    </script>
</csv-loader>
</div>

<div class="vue-mount">
<csv-loader src="data/Equipo.csv" filter-col="Tipo" category="Colaborador,Estudiante,Asociado"
            base-filter='{"estado":"activo"}'>
    <script type="text/template">
        <div v-show="loading" class="loading-state">Cargando...</div>
        <template v-if="!loading && items.length > 0">
            <h2>Colaboradores y Estudiantes</h2>
            <div class="layout-grid">
                <card-block v-for="item in items" :key="item.nombre">
                    <template #image>
                        <a v-if="item.url || item.imagen" :href="item.url ? $toHref(item.url) : item.imagen" target="_blank" :title="item.url ? 'Ver contacto' : 'Ver imagen completa'" class="team-image-container">
                            <img src="assets/img/logo.png" class="image-placeholder">
                            <img v-if="item.imagen" :src="item.imagen" :alt="item.nombre" class="image-photo" @error="$event.target.style.display='none'">
                        </a>
                        <div v-else class="team-image-container">
                            <img src="assets/img/logo.png" class="image-placeholder">
                        </div>
                    </template>
                    <contact-icons :item="item" :fields="[
                        { key: 'url', title: 'Contacto' },
                        { key: 'contacto', icon: 'bx-envelope', title: 'Correo' },
                        { key: 'linkedin', icon: 'bx-linkedin', title: 'LinkedIn' },
                        { key: 'pagina', icon: 'bx-link-alt', title: 'Página' }
                    ]"></contact-icons>
                    <div class="card-separator"></div>
                    <md-content class="card-content">
                        #### {{ item.url ? '[' + item.nombre + '](' + $toHref(item.url) + ')' : item.nombre }}
                        **{{ item.rol }}**
                        *{{ item.institucion }}*
                        {{ item.departamento }}
                    </md-content>
                </card-block>
            </div>
        </template>
    </script>
</csv-loader>
</div>

<div class="vue-mount">
<csv-loader src="data/Equipo.csv" filter-col="Estado" category="Inactivo">
    <script type="text/template">
        <div v-show="loading" class="loading-state">Cargando...</div>
        <template v-if="!loading && items.length > 0">
            <h2>Integrantes Anteriores (Inactivos)</h2>
            <div class="layout-grid">
                <card-block v-for="item in items" :key="item.nombre" class="inactive">
                    <template #image>
                        <a v-if="item.url || item.imagen" :href="item.url ? $toHref(item.url) : item.imagen" target="_blank" :title="item.url ? 'Ver contacto' : 'Ver imagen completa'" class="team-image-container">
                            <img src="assets/img/logo.png" class="image-placeholder">
                            <img v-if="item.imagen" :src="item.imagen" :alt="item.nombre" class="image-photo" @error="$event.target.style.display='none'">
                        </a>
                        <div v-else class="team-image-container">
                            <img src="assets/img/logo.png" class="image-placeholder">
                        </div>
                    </template>
                    <contact-icons :item="item" :fields="[
                        { key: 'url', title: 'Contacto' },
                        { key: 'contacto', icon: 'bx-envelope', title: 'Correo' },
                        { key: 'linkedin', icon: 'bx-linkedin', title: 'LinkedIn' },
                        { key: 'pagina', icon: 'bx-link-alt', title: 'Página' }
                    ]"></contact-icons>
                    <div class="card-separator"></div>
                    <md-content class="card-content">
                        #### {{ item.url ? '[' + item.nombre + '](' + $toHref(item.url) + ')' : item.nombre }}
                        **{{ item.rol }}**
                        {{ item.institucion }}
                        {{ item.departamento }}
                    </md-content>
                </card-block>
            </div>
        </template>
    </script>
</csv-loader>
</div>
