import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './books.service';
import { Model, QueryOptions } from 'mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create.book.dto';
import { GetAllBooksQueryDto, UpdateBookDto } from './dto';

describe('BookService', () => {
  let bookService: BookService;
  let bookModel: Model<Book>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            countDocuments: jest.fn().mockResolvedValue(0),
            find: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue({}),
            findByIdAndUpdate: jest.fn().mockResolvedValue({}),
            findByIdAndDelete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    bookService = app.get<BookService>(BookService);
    bookModel = app.get<Model<Book>>(getModelToken(Book.name));
  });

  describe('createOne', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        // Provide your test data here for creating a book
      };

      const mockBook = {
        // Provide the mock book data here
      };

      jest.spyOn(bookModel.prototype, 'save').mockResolvedValue(mockBook);

      const result = await bookService.createOne(createBookDto);

      expect(result).toBe(mockBook);
    });
  });

  describe('findAll', () => {
    it('should find all books with provided query options', async () => {
      const mockQuery: GetAllBooksQueryDto = {
        // Provide your mock query data here (if required)
      };

      const mockBooks = [
        // Provide your mock book data here
      ];

      const mockTotalBooks = 5;
      const mockTotalPages = 1;

      jest.spyOn(bookModel, 'countDocuments').mockResolvedValue(mockTotalBooks);
      jest.spyOn(bookModel, 'find').mockReturnThis();
      jest.spyOn(bookModel, 'skip').mockReturnThis();
      jest.spyOn(bookModel, 'limit').mockReturnThis();
      jest.spyOn(bookModel, 'exec').mockResolvedValue(mockBooks);

      const result = await bookService.findAll(mockQuery);

      expect(result.books).toBe(mockBooks);
      expect(result.totalBooks).toBe(mockTotalBooks);
      expect(result.totalPages).toBe(mockTotalPages);
      // Ensure other properties are correctly tested if required.
    });
  });

  describe('findOne', () => {
    it('should find one book with provided id', async () => {
      const mockId = 'mock_book_id';

      const mockBook = {
        // Provide your mock book data here
      };

      jest.spyOn(bookModel, 'findById').mockResolvedValue(mockBook);

      const result = await bookService.findOne(mockId);

      expect(result).toBe(mockBook);
    });
  });

  describe('updateOne', () => {
    it('should update one book with provided id and data', async () => {
      const mockId = 'mock_book_id';
      const updateBookDto: UpdateBookDto = {
        // Provide your mock update data here
      };

      const mockUpdatedBook = {
        // Provide your mock updated book data here
      };

      jest.spyOn(bookModel, 'findByIdAndUpdate').mockResolvedValue(mockUpdatedBook);

      const result = await bookService.updateOne(mockId, updateBookDto);

      expect(result).toBe(mockUpdatedBook);
    });
  });

  describe('deleteOne', () => {
    it('should delete one book with provided id', async () => {
      const mockId = 'mock_book_id';

      const mockDeletedBook = {
        // Provide your mock deleted book data here
      };

      jest.spyOn(bookModel, 'findByIdAndDelete').mockResolvedValue(mockDeletedBook);

      const result = await bookService.deleteOne(mockId);

      expect(result).toBe(mockDeletedBook);
    });
  });
});
