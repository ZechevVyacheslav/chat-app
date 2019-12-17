import * as express from 'express';

export const getIndexPage = (req: express.Request, res: express.Response) => {
  res.render('index', {
      message: 'Hello on the index page'
    });
};
