// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService();
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 6, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 6, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 6, 21, 10, 0, 0),
    });

    const availability = listProviderMonthAvailability.execute({
      user_id: 'id',
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ])
    );
  });
});