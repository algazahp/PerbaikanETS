$(document).ready(function () {
  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
    method: "GET",
    success: function (data) {
      var pokemonList = data.results;
      var $pokemonCards = $("#pokemon-cards");

      $.each(pokemonList, function (index, pokemon) {
        var url = pokemon.url;
        $.ajax({
          url: url,
          method: "GET",
          success: function (pokemonData) {
            var name = pokemonData.name;

            var cardHTML = `
              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-md   text-dark  mb-3">
                          <span class="pokemon-name">${name}</span>
                        </div>
                        <div class="button">
                          <button type="button" class="btn btn-primary detail-button" data-url="${url}">Detail</button>
                        </div>
                        <div class="pokemon-details">
                          <div>ID: <span class="pokemon-id"></span></div>
                          <img class="pokemon-image" src="" alt="Pokemon Image">
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              `;

            var $card = $(cardHTML);
            $pokemonCards.append($card);

            // Event handler untuk tombol "Detail"
            $card.find(".detail-button").click(function () {
              var $details = $card.find(".pokemon-details");
              if ($details.is(":visible")) {
                $details.hide();
              } else {
                var id = pokemonData.id;
                var imageUrl = pokemonData.sprites.front_default;

                $details.find(".pokemon-id").text(id);
                $details.find(".pokemon-image").attr("src", imageUrl);
                $details.show();
              }
            });
          },
          error: function (error) {
            console.log("Error fetching individual Pokemon:", error);
          },
        });
      });
    },
    error: function (error) {
      console.log("Error fetching Pokemon list:", error);
    },
  });
});
