<template>
    <div class="m-sm">
        <div>
            <div class="tags">
                <span class="tag">{{title}}</span>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <type-picker class="m-sm" :type="type" :typeLists="allowedTypes" v-on:update:type="(newType) => this.$emit('update:type', newType)">
                    <template slot="control-trigger">
                        <button class="type-button button" aria-haspopup="true" aria-controls="dropdown-menu2">
                            <span>{{type.name || "No Type Selected" | capitalize }}</span>
                            <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </template>
                </type-picker>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {ITypesToShow} from "./itypes-to-show";
    import {ITypeData} from "../models/types/itype-data";
    import {default as TypePicker} from "./type-picker.vue";

    @Component({
        components: {TypePicker}
    })
    export default class extends Vue
    {
        @Prop()
        public type: ITypeData;

        @Prop({ default: "Type"})
        public title: string;

        @Prop({ default: {}})
        public allowedTypes: ITypesToShow;
    }
</script>

<style lang="scss" scoped>
    .property-name
    {
        width: 12em;
    }

    .dropdown
    {
        width: 100%;

        >div, .type-button
        { width: 100%; }
    }
</style>