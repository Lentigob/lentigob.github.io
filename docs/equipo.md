# Equipo de Trabajo

A continuación presentamos al equipo de investigadores y colaboradores de nuestro laboratorio.

## Investigadores Principales

<div class="vue-mount">
<csv-loader src="data/Equipo.csv" filter-col="Tipo" category="Investigador"
            base-filter='{"estado":"activo"}'>
    <script type="text/template">
        <div v-show="loading" class="loading-state">Cargando...</div>
        <div v-show="!loading" class="layout-grid">
            <card-block v-for="item in items" :key="item.nombre">
                <template #image>
                    <div class="team-image-container">
                        <img src="assets/img/logo.png" class="image-placeholder">
                        <a v-if="item.imagen" :href="item.imagen" target="_blank" title="Ver imagen completa">
                            <img :src="item.imagen" :alt="item.nombre" class="image-photo" @error="$event.target.style.display='none'">
                        </a>
                    </div>
                </template>
                <div class="row align-right">
                    <a v-if="item.linkedin" :href="item.linkedin" target="_blank" title="LinkedIn"><icon-svg name="bx-linkedin" class="small gray"></icon-svg></a>
                    <a v-if="item.contacto" :href="item.contacto" target="_blank" title="Contacto"><icon-svg name="bx-envelope" class="small gray"></icon-svg></a>
                    <a v-if="item.pagina" :href="item.pagina" target="_blank" title="Pagina"><icon-svg name="bx-link-alt" class="small gray"></icon-svg></a>
                </div>
                <div class="card-separator"></div>
                <md-content class="card-content">
                    ### {{ item.nombre }}
                    **{{ item.rol }}**
                    *{{ item.institucion }}*
                    {{ item.departamento }}
                </md-content>
            </card-block>
            <div v-show="items.length === 0" class="no-results">No se encontraron integrantes activos en esta categoría.</div>
        </div>
    </script>
</csv-loader>
</div>

## Colaboradores y Estudiantes

<div class="vue-mount">
<csv-loader src="data/Equipo.csv" filter-col="Tipo" category="Colaborador,Estudiante,Asociado"
            base-filter='{"estado":"activo"}'>
    <script type="text/template">
        <div v-show="loading" class="loading-state">Cargando...</div>
        <div v-show="!loading" class="layout-grid">
            <card-block v-for="item in items" :key="item.nombre">
                <template #image>
                    <div class="team-image-container">
                        <img src="assets/img/logo.png" class="image-placeholder">
                        <a v-if="item.imagen" :href="item.imagen" target="_blank" title="Ver imagen completa">
                            <img :src="item.imagen" :alt="item.nombre" class="image-photo" @error="$event.target.style.display='none'">
                        </a>
                    </div>
                </template>
                <div class="row align-right">
                    <a v-if="item.linkedin" :href="item.linkedin" target="_blank" title="LinkedIn"><icon-svg name="bx-linkedin" class="small gray"></icon-svg></a>
                    <a v-if="item.contacto" :href="item.contacto" target="_blank" title="Contacto"><icon-svg name="bx-envelope" class="small gray"></icon-svg></a>
                    <a v-if="item.pagina" :href="item.pagina" target="_blank" title="Pagina"><icon-svg name="bx-link-alt" class="small gray"></icon-svg></a>
                </div>
                <div class="card-separator"></div>
                <md-content class="card-content">
                    ### {{ item.nombre }}
                    **{{ item.rol }}**
                    *{{ item.institucion }}*
                    {{ item.departamento }}
                </md-content>
            </card-block>
            <div v-show="items.length === 0" class="no-results">No se encontraron integrantes.</div>
        </div>
    </script>
</csv-loader>
</div>

## Integrantes Anteriores (Inactivos)

<div class="vue-mount">
<csv-loader src="data/Equipo.csv" filter-col="Estado" category="Inactivo">
    <script type="text/template">
        <div v-show="loading" class="loading-state">Cargando...</div>
        <div v-show="!loading" class="layout-grid">
            <card-block v-for="item in items" :key="item.nombre" class="inactive">
                <template #image>
                    <div class="team-image-container">
                        <img src="assets/img/logo.png" class="image-placeholder">
                        <a v-if="item.imagen" :href="item.imagen" target="_blank" title="Ver imagen completa">
                            <img :src="item.imagen" :alt="item.nombre" class="image-photo" @error="$event.target.style.display='none'">
                        </a>
                    </div>
                </template>
                <div class="row align-right">
                    <a v-if="item.linkedin" :href="item.linkedin" target="_blank" title="LinkedIn"><icon-svg name="bx-linkedin" class="small gray"></icon-svg></a>
                    <a v-if="item.contacto" :href="item.contacto" target="_blank" title="Contacto"><icon-svg name="bx-envelope" class="small gray"></icon-svg></a>
                    <a v-if="item.pagina" :href="item.pagina" target="_blank" title="Pagina"><icon-svg name="bx-link-alt" class="small gray"></icon-svg></a>
                </div>
                <div class="card-separator"></div>
                <md-content class="card-content">
                    ### {{ item.nombre }}
                    **{{ item.rol }}**
                    {{ item.institucion }}
                    {{ item.departamento }}
                </md-content>
            </card-block>
            <div v-show="items.length === 0" class="no-results">No hay registros inactivos.</div>
        </div>
    </script>
</csv-loader>
</div>
