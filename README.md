meteor gcs - google cloud storage uploader
----

```
meteor add flynn:gcs
```

## example
```
import { WebApp } from 'meteor/webapp';
import { GCSOptions, GoogleCloudStorage } from 'meteor/flynn:gcs';
const option = Meteor.settings['gcs'] as GCSOptions;
const googleCloudStorage = new GoogleCloudStorage(option);

WebApp.connectHandlers.use('/api/upload', function (req, res, next) {
  if (req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    try {
      const imageUrl = googleCloudStorage.uploadByRequest(req, res);
      const result = imageUrl ? { imageUrl } : {};
      res.end(JSON.stringify(result));
    } catch (e) {
      res.end(JSON.stringify(e));
    }
  } else {
    next();
  }
});
```