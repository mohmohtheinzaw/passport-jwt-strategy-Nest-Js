type paginationInterface = {
  total: number;
  totalPage: number;
};

type responseInterface = {
  statusCode: number;
  message: string;
  body: any;
  pagination?: paginationInterface;
};

export const Responser = ({
  statusCode,
  message,
  body,
  pagination,
}: responseInterface) => {
  return {
    meta: {
      success: statusCode >= 200 && statusCode <= 300 ? true : false,
      message: message,
    },
    body: body,
    pagination: pagination,
  };
};
