<template>
    <div class="dropdown is-hoverable">
        <div class="dropdown-trigger">
            <slot name="control-trigger">
                <button class="type-button button" aria-haspopup="true" aria-controls="dropdown-menu2">
                    <span>{{type.name || "..." | capitalize | truncate(10)}}</span>
                    <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </slot>
        </div>
        <div class="dropdown-menu" id="dropdown-menu2" role="menu">
            <div class="type-picker dropdown-content">
                <div class="dropdown-item" v-if="allowFiltering">
                    <div class="field">
                        <input class="input" type="text" v-model="filterText" placeholder="Filter By">
                    </div>
                </div>
                <hr class="dropdown-divider">
                <slot name="custom-picker"></slot>
                <template v-for="(typeList, key) in filteredTypeList">
                    <div class="dropdown-item">
                        <p>{{key | capitalize}}</p>
                        <template v-for="possibleType in typeList">
                            <a class="tag m-xxs" :class="{ 'is-success': isTypeMatch(type, possibleType) }" @click="updateType(possibleType)">{{possibleType.name | capitalize}}</a>
                        </template>
                    </div>
                    <hr class="dropdown-divider">
                </template>
                <div class="dropdown-item" v-if="allowCustomType">
                    <p>Add Custom Type</p>
                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field">
                                <input class="input" type="text" v-model="customType.name" placeholder="Class Name">
                            </div>
                            <div class="field">
                                <input class="input" type="text" v-model="customType.namespace" placeholder="Namespace">
                            </div>
                            <button class="button is-primary" @click="addCustomType">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {TypeData} from "../models/types/type-data";
    import {Prop, Component, Vue} from "vue-property-decorator";
    import {ITypesToShow} from "./itypes-to-show";
    import {ITypeData} from "../models/types/itype-data";
    import {createRuleset} from "@treacherous/core";
    import {createRulesetFor} from "@treacherous/decorators";
    import {ValidateWith} from "@treacherous/vue";

    const typeDataRuleset = createRulesetFor(TypeData);

    const typePickerRuleset = createRuleset()
        .forProperty("customType")
        .addRuleset(typeDataRuleset)
        .build();

    @Component({
        mixins: [ ValidateWith(typePickerRuleset, { validateProps: true, withReactiveValidation: true }) ]
    })
    export class TypePickerComponent extends Vue
    {
        @Prop()
        public type: ITypeData;

        @Prop()
        public typeLists: ITypesToShow;

        @Prop({ default: true })
        public allowCustomType: boolean;

        @Prop({ default: true })
        public allowFiltering: boolean;

        public customType = new TypeData();
        public filterText = "";

        public updateType(newType: TypeData)
        { this.$emit("update:type", newType); }

        public addCustomType()
        { this.$emit("update:type", this.customType)}

        public isTypeMatch(a: ITypeData, b: ITypeData) {
            return a.name == b.name && a.namespace == b.namespace;
        }

        public get filteredTypeList() {
            if(!this.allowFiltering) { return this.typeLists; }

            const filteringText = this.filterText.toLowerCase();
            const filteredList: ITypesToShow = {};
            for(const key in this.typeLists)
            {
                const typesInGroup = [];
                this.typeLists[key].forEach((type: ITypeData) => {
                    if(type.name.toLowerCase().indexOf(filteringText) < 0){ return; }
                    typesInGroup.push(type);
                });

                if(typesInGroup.length >= 1)
                { filteredList[key] = typesInGroup; }
            }

            return filteredList;
        }
    }
</script>

<style lang="scss" scoped>
    .type-button
    {
        width: 6em;
    }

    .type-picker
    {
        width: 30em;
    }

    .dropdown-trigger
    { width: 100%; }
</style>