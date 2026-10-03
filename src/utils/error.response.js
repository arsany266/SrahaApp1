export const ErrorRespone = ({
  message = "Error",
  status = 400,
  extra = undefined,
}) => {
  const error = new Error(
    typeof message == "string" ? message : message?.message || "Error",
  );
  error.status = status;
  error.extra = extra;
  throw error;
};

export const BadRequestExeception = (
  message = "BadRequestExeception",
  extra = undefined,
) => {
  return ErrorRespone({ message, status: 400, extra });
};

export const ConflictExeception = (
  message = "ConflictExeception",
  extra = undefined,
) => {
  return ErrorRespone({ message, status: 409, extra });
};

export const UnauthorizedExeception = (
  message = "UnauthorizedExeception",
  extra = undefined,
) => {
  return ErrorRespone({ message, status: 401, extra });
};

export const NotFoundExeception = (
  message = "NotFoundExeception",
  extra = undefined,
) => {
  return ErrorRespone({ message, status: 404, extra });
};

export const ForbiddenExeception = (
  message = "ForbiddenExeception",
  extra = undefined,
) => {
  return ErrorRespone({ message, status: 403, extra });
};

export const globalErrorHandler = (error, req, res, next) => {
  const status = error.status ?? 500;
  const extra = error.extra || undefined;
  return res
    .status(status)
    .json({ message: error.message, stack: error.stack, status, extra });
};
