// src/database/mongoose-plugins.ts
const softDeletePlugin = (Schema) => {
    // Add a condition to all queries where deleted_at is null
    Schema.pre('find', function () {
      this.where({ deleted_at: null });
    });
  };
  
  export { softDeletePlugin };
  