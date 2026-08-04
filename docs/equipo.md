# Equipo de Trabajo

A continuación presentamos al equipo de investigadores y colaboradores de nuestro laboratorio.

## Investigadores Principales

<div class="vue-mount">
<csv-loader src="data/Equipo.csv" filter-col="Tipo" category="Investigador"
            base-filter='{"estado":"activo"}'>
    <script type="text/template">
        <div v-show="loading" class="loading-state">Cargando...</div>
        <div v-show="!loading" class="layout-grid">
            <div class="card" v-for="item in items" :key="item.nombre">
                <div class="team-image-container">
                    <img src="assets/img/logo.png" class="image-placeholder">
                    <a v-if="item.imagen" :href="item.imagen" target="_blank" title="Ver imagen completa">
                        <img :src="item.imagen" :alt="item.nombre" class="image-photo" @error="$event.target.style.display='none'">
                    </a>
                </div>
                <div class="card__body">
                    <div class="icon-links align-right no-break">
                        <a v-if="item.linkedin" :href="item.linkedin" target="_blank" title="LinkedIn"><svg class="icon-svg small gray"><use xlink:href="assets/icons/sprite.svg#bx-linkedin"></use></svg></a>
                        <a v-if="item.contacto" :href="item.contacto" target="_blank" title="Contacto"><svg class="icon-svg small gray"><use xlink:href="assets/icons/sprite.svg#bx-envelope"></use></svg></a>
                        <a v-if="item.pagina" :href="item.pagina" target="_blank" title="Pagina"><svg class="icon-svg small gray"><use xlink:href="assets/icons/sprite.svg#bx-link-alt"></use></svg></a>
                    </div>
                    <md-content>
                        ### {{ item.nombre }}
                        **{{ item.rol }}**  
                        *{{ item.institucion }}*
                        {{ item.departamento }}
                    </md-content>
                </div>
            </div>
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
            <div class="card" v-for="item in items" :key="item.nombre">
                <div class="team-image-container">
                    <img src="assets/img/logo.png" class="image-placeholder">
                    <a v-if="item.imagen" :href="item.imagen" target="_blank" title="Ver imagen completa">
                        <img :src="item.imagen" :alt="item.nombre" class="image-photo" @error="$event.target.style.display='none'">
                    </a>
                </div>
                <div class="card__body">
                    <div class="icon-links align-right no-break">
                        <a v-if="item.linkedin" :href="item.linkedin" target="_blank" title="LinkedIn"><svg class="icon-svg small gray"><use xlink:href="assets/icons/sprite.svg#bx-linkedin"></use></svg></a>
                        <a v-if="item.contacto" :href="item.contacto" target="_blank" title="Contacto"><svg class="icon-svg small gray"><use xlink:href="assets/icons/sprite.svg#bx-envelope"></use></svg></a>
                        <a v-if="item.pagina" :href="item.pagina" target="_blank" title="Pagina"><svg class="icon-svg small gray"><use xlink:href="assets/icons/sprite.svg#bx-link-alt"></use></svg></a>
                    </div>
                    <md-content>
                        ### {{ item.nombre }}
                        **{{ item.rol }}**  
                        *{{ item.institucion }}*
                        {{ item.departamento }}
                    </md-content>
                </div>
            </div>
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
            <div class="card card--inactive" v-for="item in items" :key="item.nombre">
                <div class="team-image-container">
                    <img src="assets/img/logo.png" class="image-placeholder">
                    <a v-if="item.imagen" :href="item.imagen" target="_blank" title="Ver imagen completa">
                        <img :src="item.imagen" :alt="item.nombre" class="image-photo" @error="$event.target.style.display='none'">
                    </a>
                </div>
                <div class="card__body">
                    <div class="icon-links align-right no-break">
                        <a v-if="item.linkedin" :href="item.linkedin" target="_blank" title="LinkedIn"><svg class="icon-svg small gray"><use xlink:href="assets/icons/sprite.svg#bx-linkedin"></use></svg></a>
                        <a v-if="item.contacto" :href="item.contacto" target="_blank" title="Contacto"><svg class="icon-svg small gray"><use xlink:href="assets/icons/sprite.svg#bx-envelope"></use></svg></a>
                        <a v-if="item.pagina" :href="item.pagina" target="_blank" title="Pagina"><svg class="icon-svg small gray"><use xlink:href="assets/icons/sprite.svg#bx-link-alt"></use></svg></a>
                    </div>
                    <md-content>
                        ### {{ item.nombre }}
                        **{{ item.rol }}**  
                        *{{ item.institucion }}*
                        {{ item.departamento }}
                    </md-content>
                </div>
            </div>
            <div v-show="items.length === 0" class="no-results">No hay registros inactivos.</div>
        </div>
    </script>
</csv-loader>
</div>
