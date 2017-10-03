import PropTypes from 'prop-types';
import { chain, isEmpty, sortBy, zipObject } from 'lodash';
import CollegeGroup from './CollegeGroup';

function groupPairs(blogs, property) {
  return chain(blogs)
    .groupBy(property)
    .toPairs()
    .value()
    .map(pair => zipObject([property, 'blogs'], pair));
}

const groupBlogs = blogs => {
  const groupedByCollege = groupPairs(blogs, 'college.name');
  const groupedByYear = groupedByCollege.map(group => ({
    college: group['college.name'],
    years: groupPairs(group.blogs, 'year')
  }));
  const sortedByCollege = sortBy(groupedByYear, 'college');
  return sortedByCollege;
};

const Blogs = ({ blogs }) => {
  if (isEmpty(blogs)) {
    return (
      <p>
        {'No blogs found. 😿'}
        <style jsx>{`
          p {
            margin-top: 2rem;
            margin-bottom: 2rem;
          }
        `}</style>
      </p>
    );
  }
  const groupedBlogs = groupBlogs(blogs);
  return (
    <div>
      {groupedBlogs.map((collegeGroup, collegeIndex) => (
        <CollegeGroup key={collegeIndex} {...collegeGroup} />
      ))}
      <style jsx>{`
        div {
          margin-top: 3rem;
          margin-bottom: 3rem;
        }
      `}</style>
    </div>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Blogs;
