"use strict";

module.exports = ({ strapi }) => ({
  getPopulateStructure(
    uid,
    showImages,
    showRelations,
    showComponents,
    depth = 0,
  ) {
    if (depth > 3) return null;

    const schema = strapi.contentType(uid) || strapi.components[uid];
    if (!schema) return null;

    const populate = {};

    for (const [key, attribute] of Object.entries(schema.attributes)) {
      const systemFields = ["createdBy", "updatedBy", "localizations"];
      if (systemFields.includes(key)) continue;

      // 1. MEDIA
      if (attribute.type === "media") {
        if (depth === 0 || showImages) {
          populate[key] = true;
        }
      }

      // 2. RELATIONS
      else if (attribute.type === "relation") {
        if (showRelations) {
          const relPop = this.getPopulateStructure(
            attribute.target,
            showImages,
            showRelations,
            showComponents,
            depth + 1,
          );
          populate[key] = relPop ? { populate: relPop } : true;
        } else if (depth === 0) {
          populate[key] = true;
        }
      }

      // 3. COMPONENTS (The Logic Change is here)
      else if (attribute.type === "component") {
        // If it's a root component OR showComponents is ON, we calculate sub-population
        if (depth === 0 || showComponents) {
          const innerPop = this.getPopulateStructure(
            attribute.component,
            showImages,
            showRelations,
            showComponents,
            depth + 1,
          );

          if (innerPop) {
            populate[key] = { populate: innerPop };
          } else {
            populate[key] = true;
          }
        }
        // If we are deep and showComponents is OFF, we skip this component entirely
      }

      // 4. DYNAMIC ZONES
      else if (attribute.type === "dynamiczone") {
        if (depth === 0 || showComponents) {
          const dzPopulate = {};
          attribute.components.forEach((compUid) => {
            const compStructure = this.getPopulateStructure(
              compUid,
              showImages,
              showRelations,
              showComponents,
              depth + 1,
            );
            dzPopulate[compUid] = compStructure
              ? { populate: compStructure }
              : true;
          });
          populate[key] = { on: dzPopulate };
        }
      }
    }

    return Object.keys(populate).length > 0 ? populate : null;
  },
});
