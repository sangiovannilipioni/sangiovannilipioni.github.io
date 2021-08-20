<template>
<div class="container">
    <div class="binome card p-2">
        <div class="flex-grow-1">
            <span v-html="$t('maiellaverde_desc')" />
            <a href="https://riabitaresangiovanni.maiellaverde.it/" target="_maiellaverde">
                <font-awesome-icon :icon="['fas', 'external-link-alt']" />
            </a>
        </div>
        <div class="ml-auto">
            <a href="https://riabitaresangiovanni.maiellaverde.it/" target="_maiellaverde">
                <nuxt-img src="/jpg/maiellaverde.jpg" alt="Maiella Verde" style="max-width:100%;"/>
            </a>
        </div>
    </div>


</div>
</template>

