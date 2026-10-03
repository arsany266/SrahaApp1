export const findOne = async ({
  model,
  select = "",
  filter = {},
  options = {},
}) => {
  const doc = model.findOne(filter);
  if (select.length) {
    doc.select(select);
  }
  if (options?.populate) {
    doc.populate(options.populate);
  }
  if (options?.lean) {
    doc.lean(options.lean);
  }
  return await doc.exec();
};

export const findById = async ({ model, select = "", id, options = {} }) => {
  const doc = model.findById(id);
  if (select?.length) {
    doc.select(select);
  }
  if (options?.populate) {
    doc.populate(options.populate);
  }
  if (options?.lean) {
    doc.lean(options.lean);
  }
  return await doc.exec();
};

export const find = async ({ model, select = "", filter, id, options = {} }) => {
  const doc = model.find(filter);
  if (select.length) {
    doc.select(select);
  }
  if (options?.populate) {
    doc.populate(options.populate);
  }
  if (options?.lean) {
    doc.lean(options.lean);
  }
  if (options?.limit) {
    doc.limit(options.limit);
  }
  if (options?.skip) {
    doc.skip(options.skip);
  }
  return await doc.exec();
};

export const insertMany = async ({ model, data }) => {
  return await model.insertMany(data);
};

export const create = async ({
  model,
  data = [],
  options = { validateBeforeSave: true },
}) => {
  const [doc] = (await model.create(data, options)) || [];
  return doc;
};

export const updateOne = async ({
  model,
  filter = {},
  update,
  options ,
}) => {
  return await model.updateOne(
    filter,
    { ...update, $inc: { __v: 1 } },
    options,
  );
};

export const findOneAndUpdate = async ({
  model,
  filter = {},
  update,
  options,
}) => {
  return await model.findOneAndUpdate(
    filter,
    { ...update, $inc: { __v: 1 } },
    { new: true, runValidator: true, ...options },
  );
};

export const findByIdAndUpdate = async ({
  model,
  id = "",
  update,
  options = { new : true ,runValidator: true },
}) => {
  return await model.findByIdAndUpdate(
    id,
    { ...update,
      //  $_inc: { __v: 1 }
       },
    options ,
  );
};

export const DeleteOne = async ({
  model,
  filter ={}
}) => {
  return await model.DeleteOne(filter)
  ;
};

export const DeleteMany = async ({
  model,
  filter ={}
}) => {
  return await model.DeleteMany(filter)
  ;
};

export const findOneAndDelete = async ({
  model,
  filter ={}
}) => {
  return await model.findOneAndDelete(filter)
  ;
};




