const gulp = require('gulp');
const awspublish = require('gulp-awspublish');
const rename = require('gulp-rename');
const argv = require('yargs').argv;


function getS3Params() {
  return {
    region: 'ap-southeast-1',
    bucket: 'BUCKET',
    dir: 'DIR',
  };
}

gulp.task('deploy', () => {
  const s3Params = getS3Params();
  const publisher = awspublish.create({
    region: s3Params.region,
    params: {
      Bucket: s3Params.bucket,
    },
  });

  const s3Dir = s3Params.dir;
  return gulp.src('./dist/**/*')
    .pipe(rename((path) => {
      path.dirname = `${s3Dir}${path.dirname}`;
    }))
    .pipe(publisher.publish())
    .pipe(publisher.sync(s3Dir))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});


gulp.task('default', ['deploy']);

