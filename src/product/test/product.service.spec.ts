import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Product } from '../product.entity';
import { ProductService } from '../product.service';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<Product>;

  const mockProductRepository = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const product = {
    id: 1,
    name: 'Test Product',
    description: 'A test product',
    price: 100.5,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      mockProductRepository.findAndCount.mockResolvedValue([[product], 1]);

      const result = await service.findAll(1, 10);

      expect(result).toEqual({
        data: [product],
        total: 1,
        currentPage: 1,
        totalPages: 1,
      });
      expect(mockProductRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      mockProductRepository.findOne.mockResolvedValue(product);

      const result = await service.findOne(1);

      expect(result).toEqual(product);
      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw a NotFoundException if product not found', async () => {
      mockProductRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      mockProductRepository.create.mockReturnValue(product);
      mockProductRepository.save.mockResolvedValue(product);

      const result = await service.create({
        name: 'Test Product',
        description: 'A test product',
        price: 100.5,
        stock: 10,
      });

      expect(result).toEqual(product);
      expect(mockProductRepository.create).toHaveBeenCalledWith({
        name: 'Test Product',
        description: 'A test product',
        price: 100.5,
        stock: 10,
      });
      expect(mockProductRepository.save).toHaveBeenCalledWith(product);
    });
  });
});
