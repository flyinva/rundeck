<template>
    <span
        :class="descriptionCss"
        v-if="showDescription"
        style="margin-left: 5px"
    >
      {{ shortDescription }}
    </span>
    <details
        class="more-info details-reset"
        :class="extendedCss"
        v-if="showDescription && showExtended && extraDescription"
    >
      <summary>
        {{ $t('more') }}
        <span class="more-indicator-verbiage more-info-icon">
          <i class="glyphicon glyphicon-chevron-right" />
        </span>
        <span class="less-indicator-verbiage more-info-icon">
          <i class="glyphicon glyphicon-chevron-down" />
        </span>
      </summary>

      {{ extraDescription }}
    </details>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PluginDetails",
  props: {
    showDescription: {
      type: Boolean,
      default: true,
      required: false,
    },
    showExtended: {
      type: Boolean,
      default: true,
      required: false,
    },
    description: {
      type: String,
      default: "",
      required: false,
    },
    descriptionCss: {
      type: String,
      default: "",
      required: false,
    },
    extendedCss: {
      type: String,
      default: "text-muted",
      required: false,
    },
  },
  computed: {
    shortDescription(): string {
      const desc = this.description;
      if (desc && desc.indexOf("\n") > 0) {
        return desc.substring(0, desc.indexOf("\n"));
      }
      return desc;
    },
    extraDescription(): string | null {
      const desc = this.description;
      if (desc && desc.indexOf("\n") > 0) {
        return desc.substring(desc.indexOf("\n") + 1);
      }
      return '';
    },
  },
})
</script>


<style scoped lang="scss">

</style>