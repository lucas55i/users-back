import { User } from "./user"

describe('Models', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});
