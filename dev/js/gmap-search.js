
function GmapSearch(options) {
    var mapOptions = {
            center: new google.maps.LatLng(-33.8688, 151.2195),
            zoom: 13
        },
        self = this;

    if(options.mapOptions) {
        mapOptions = helpers.merge(mapOptionsDefaults, options.mapOptions);
    }

    self.init = function() {
        self.map = new google.maps.Map(document.getElementById(options.mapSelector), mapOptions);

        self.input = document.getElementById(options.inputSelector);

        self.map.controls[google.maps.ControlPosition.TOP_LEFT].push(self.input);

        self.autocomplete = new google.maps.places.Autocomplete(self.input);
        self.autocomplete.bindTo('bounds', self.map);

        self.infowindow = new google.maps.InfoWindow();

        self.marker = new google.maps.Marker({
            map: self.map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        google.maps.event.addListener(self.autocomplete, 'place_changed', function() {
            self.infowindow.close();
            self.marker.setVisible(false);

            self.place = self.autocomplete.getPlace();
            if (!self.place.geometry) {
                return;
            }

            if (self.place.geometry.viewport) {
                self.map.fitBounds(self.place.geometry.viewport);
            } else {
                self.map.setCenter(self.place.geometry.location);
                self.map.setZoom(17);  // Why 17? Because it looks good.
            }

            self.marker.setIcon(({
                url: self.place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));

            self.marker.setPosition(self.place.geometry.location);
            self.marker.setVisible(true);

            self.address = '';
            if (self.place.address_components) {
                self.address = [
                    (self.place.address_components[0] && self.place.address_components[0].short_name || ''),
                    (self.place.address_components[1] && self.place.address_components[1].short_name || ''),
                    (self.place.address_components[2] && self.place.address_components[2].short_name || '')
                ].join(' ');
            }

            self.infowindow.setContent('<div><strong>' + self.place.name + '</strong><br>' + self.address + '</div>');
            self.infowindow.open(self.map, self.marker);
        });
    }

    google.maps.event.addDomListener(window, 'load', self.init);
}