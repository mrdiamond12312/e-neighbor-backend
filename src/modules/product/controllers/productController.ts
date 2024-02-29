import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ROLE } from '../../../constants';
import { Auth } from '../../../decorators';
import { CreateProductDto } from '../domains/dtos/createProduct.dto';
import { ProductService } from '../services/product.service';
import { ProductEntity } from '../domains/entities/product.entity';
import { ProductDto } from '../domains/dtos/product.dto';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth([ROLE.LESSOR])
  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiOkResponse({
    type: ProductEntity,
  })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }

  @Get(':id')
  @ApiOkResponse({
    type: ProductDto,
  })
  async findProductById(@Param('id') id: number): Promise<ProductDto> {
    return this.productService.findOneById(id);
  }
}