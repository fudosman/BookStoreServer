import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './books.controller';
import { BookService } from './books.service';
import { Response } from 'express';
import { CreateBookDto, GetAllBooksQueryDto, UpdateBookDto } from './dto';

describe('BookController', () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    bookController = app.get<BookController>(BookController);
    bookService = app.get<BookService>(BookService);
  });

  describe('createBook', () => {
    it('should create a new book and return a success response', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Example Book',
        author: 'John Doe',
        genre: 'Fiction',
        price: 19.99,
        availability: true,
      };

      const mockBook = {
        id: 'random_id',
        ...createBookDto,
      };

      jest.spyOn(bookService, 'createOne').mockResolvedValue(mockBook);

      const response: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any;

      await bookController.createBook(createBookDto, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: 'Book created successfully',
        book: mockBook,
      });
    });
  });

  describe('findAllBooks', () => {
    it('should find all books and return a success response', async () => {
      const mockQuery: GetAllBooksQueryDto = {
        page: 1,
        perPage: 10,
        title: 'some title',
        author: 'some author',
        availability: true,
      };

      const mockBooks = {
        books: [
          {
            id: 'random_id_1',
            title: 'Book 1',
            author: 'Author 1',
            genre: 'Fiction',
            price: 19.99,
            availability: true,
          },
          {
            id: 'random_id_2',
            title: 'Book 2',
            author: 'Author 2',
            genre: 'Non-Fiction',
            price: 12.99,
            availability: false,
          },
        ],
        totalBooks: 5,
        totalPages: 1,
        currentPage: 1,
        itemsReturnedPerPage: 10,
        title: 'some title',
        author: 'some author',
        availability: true,
      };

      jest.spyOn(bookService, 'findAll').mockResolvedValue(mockBooks);

      const response: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any;

      await bookController.findAllBooks(mockQuery, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: 'Books successfully retrieved',
        books: mockBooks.books,
      });
    });
  });

  describe('findOneBook', () => {
    it('should find one book and return a success response', async () => {
      const mockId = 'mock_book_id';
      const mockBook = {
        title: 'Example Book',
        author: 'John Doe',
        genre: 'Fiction',
        price: 19.99,
        availability: true,
      };

      const response: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any;

      await bookController.findOneBook(mockId, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: `Book with id: ${mockId} successfully retrieved`,
        book: mockBook,
      });
    });
  });

  describe('updateBook', () => {
    it('should update one book and return a success response', async () => {
      const mockId = 'mock_book_id';
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Book Title',
        author: 'Updated Author Name',
        genre: 'Updated Genre',
        price: 24.99,
        availability: false,
      };

      const mockBook = {
        id: mockId,
        ...updateBookDto,
      };

      const response: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any;

      await bookController.updateBook(mockId, updateBookDto, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: `Book with id: ${mockId} successfully updated`,
        book: mockBook,
      });
    });
  });

  describe('deleteBook', () => {
    it('should delete one book and return a success response', async () => {
      const mockId = 'mock_book_id';

      const mockBook = {
        id: mockId,
        title: 'Deleted Book',
        author: 'John Doe',
        genre: 'Fiction',
        price: 19.99,
        availability: false,
      };

      const response: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any;

      await bookController.deleteBook(mockId, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: `Book with id: ${mockId} successfully deleted`,
        book: mockBook,
      });
    });
  });
});
