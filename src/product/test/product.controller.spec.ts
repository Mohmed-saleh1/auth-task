import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PaginationDto } from '../dto/pagination.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const result = {
        data: [],
        total: 0,
        currentPage: 1,
        totalPages: 1,
      };

      mockProductService.findAll.mockResolvedValue(result);
      let query: PaginationDto;
      expect(await controller.findAll(query)).toEqual(result);
      expect(mockProductService.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const product = { id: 1, name: 'Test Product' };

      mockProductService.findOne.mockResolvedValue(product);

      expect(await controller.findOne(1)).toEqual(product);
      expect(mockProductService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'A test product',
        price: 100.5,
        stock: 10,
      };

      const product = { id: 1, ...createProductDto };

      mockProductService.create.mockResolvedValue(product);

      expect(await controller.create(createProductDto)).toEqual(product);
      expect(mockProductService.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
      };

      const product = { id: 1, ...updateProductDto };

      mockProductService.update.mockResolvedValue(product);

      expect(await controller.update(1, updateProductDto)).toEqual(product);
      expect(mockProductService.update).toHaveBeenCalledWith(
        1,
        updateProductDto,
      );
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      mockProductService.remove.mockResolvedValue(undefined);

      expect(await controller.remove(1)).toBeUndefined();
      expect(mockProductService.remove).toHaveBeenCalledWith(1);
    });
  });
});
