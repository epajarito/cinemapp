<template>
    <div class="text-center">
        <button class="btn btn-sm btn-primary" @click="fetchItems(pagination.prev)"
                :disabled="!pagination.prev">
            Anterior
        </button>
        <span>Pagina {{pagination.current_page}} de {{ pagination.last_page}} </span>
        <button class="btn btn-primary btn-sm" @click="fetchItems(pagination.next)"
                :disabled="!pagination.next">Siguiente
        </button>
    </div>
</template>
<script>
export default {
    props : ["fetchItems","pagination"]
}
</script>
