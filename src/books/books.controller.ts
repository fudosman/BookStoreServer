import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateBookDto, GetAllBooksQueryDto, UpdateBookDto } from './dto';

import { BookService } from './books.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
    const book = await this.bookService.createOne(createBookDto);

    return res.status(201).json({
      success: true,
      message: 'Book created successfully',
      book: book,
    });
  }

  @Get()
  async findAllBooks(
    @Query() query: GetAllBooksQueryDto,
    @Res() res: Response,
  ) {
    const books = await this.bookService.findAll(query);

    return res.status(200).json({
      success: true,
      message: 'Books successfully retrieved',
      books,
    });
  }

  @Get(':id')
  async findOneBook(@Param('id') id: string, @Res() res: Response) {
    const book = await this.bookService.findOne(id);

    return res.status(200).json({
      success: true,
      message: `Book with id: ${id} successfully retrieved`,
      book,
    });
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Res() res: Response,
  ) {
    const book = await this.bookService.updateOne(id, updateBookDto);

    return res.status(200).json({
      success: true,
      message: `Book with id: ${id} successfully updated`,
      book,
    });
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string, @Res() res: Response) {
    const book = await this.bookService.deleteOne(id);

    return res.status(200).json({
      success: true,
      message: `Book with id: ${id} successfully deleted`,
      book,
    });
  }
}
