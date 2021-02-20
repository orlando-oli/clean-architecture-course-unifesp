import 'module-alias/register';
import { MongoHelper } from '@/external/repositories/mongodb/helper';
import { app } from '@/main/config/app';

MongoHelper.connect('mongodb://localhost')
  .then(async () => {
    app.listen(5000, () => {
      console.log('Server running at https://localhost:5000');
    });
  })
  .catch(console.error);
