import AppDataSource from '../database';
import {Feedback} from '../entity/Feedback';

const FDRepo = AppDataSource.getRepository(Feedback);

export const removeFeedback = (id: number) => {
  return FDRepo.delete(id);
};

export const createFeedback = (feedback: Feedback) => {
  return FDRepo.insert(feedback);
};

export const findFeedbacks = (current: number, size: number, q?: any, key = 'name') => {
  return FDRepo.find({
    order: {
      id: 'ASC'
    },
    skip: (current - 1) * size,
    take: size,
    where: {
      [key]: q
    }
  });
};

export const getTotalOfFeedbacks = () => {
  return FDRepo.count();
}