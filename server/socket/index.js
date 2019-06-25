module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.on('meetup/postSave', function(post) {
      io.emit('meetup/postPublished', post);
    });
  });
};
