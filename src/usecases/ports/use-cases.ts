/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UseCase {
  perform(request: any): Promise<any>;
}
