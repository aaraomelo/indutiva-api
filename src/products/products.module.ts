import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          ProductSchema.set('toJSON', {
            transform: function (doc, ret, options) {
              ret.id = ret._id;
              delete ret._id;
              delete ret.__v;
            }
          });
          return ProductSchema;
        },
      },
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
