$(document).ready(function() {
  class Person {
    constructor(name, photo, scores) {
      this.name = name;
      this.photo = photo;
      this.scores = scores;
    }

    postNewPerson() {
      return $.post('/api/friends', this);
    }

    static getAllPerson() {
      return $.get('/api/friends');
    }
  }

  $(document).on('click', '#submit', function(event) {
    const answers = [];
    event.preventDefault();
    $('.modal-body').empty();
    const name = $('#name-form').val();
    const image = $('#image-form').val();
    $('#form option:selected').each(function() {
      const value = $(this).val();
      if (value == 'Select an Option') {
        return;
      } else {
        answers.push(value);
      }
    });

    if (!name || !image || answers.length !== 10) {
      $('.warning-area').html(
        '<p class="text-center">You must fill out every question!</p>'
      );

      setTimeout(function() {
        $('.warning-area').empty();
      }, 2000);
    } else {
      $('#name-form').val('');
      $('#image-form').val('');
      getMatch(name, image, answers);
    }
  });

  function getMatch(name, image, answers) {
    const user = new Person(name, image, answers);
    const userTotal = answers.reduce((acc, num) => {
      const numInt = parseInt(num);
      return (acc += numInt);
    }, 0);

    Person.getAllPerson().done(function(result) {
      const scoreDifferences = result.reduce((acc, person, index) => {
        let difference = null;
        const scoreTotal = person.scores.reduce((total, score) => {
          return (total += parseInt(score));
        }, 0);

        difference = scoreTotal - userTotal;
        if (Math.sign(difference) === -1) {
          difference *= -1;
        }

        const obj = {
          index: index,
          difference: difference
        };

        acc.push(obj);
        return acc;
      }, []);

      const differencesArr = scoreDifferences.map(obj => {
        return obj.difference;
      });

      const sortedDifferences = differencesArr.sort((a, b) => {
        return a - b;
      });

      const matchedPerson = scoreDifferences.find(obj => {
        return obj.difference === sortedDifferences[0];
      });

      const htmlName = `<h3>Name: ${result[matchedPerson.index].name}</h3>`;
      const htmlImage = `<img src="${result[matchedPerson.index].photo}>`;
      const html = $('<div>').html(htmlName + htmlImage);
      $('.modal-body').append(html);
      $('.modal').modal('show');

      user.postNewPerson();
    });
  }
});
