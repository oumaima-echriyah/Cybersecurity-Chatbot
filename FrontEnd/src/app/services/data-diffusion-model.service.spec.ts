import { TestBed } from '@angular/core/testing';

import { DataDiffusionModelService } from './data-diffusion-model.service';

describe('DataDiffusionModelService', () => {
  let service: DataDiffusionModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDiffusionModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
