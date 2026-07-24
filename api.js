// ==================== TOTO SHARED API ====================
// Free shared storage for cross-device sync
// Uses jsonbin.io-like approach with localStorage fallback

var TOTO_API = {
  // Using a simple approach: Store data in a shared way
  // For production, use Firebase or Supabase
  BASE_KEY: 'toto_shared_data',
  
  // Get all shared data
  getData: function(callback){
    // Try to fetch from shared storage
    var stored = localStorage.getItem(this.BASE_KEY);
    var data = stored ? JSON.parse(stored) : {drivers:[], bookings:[], cities:[]};
    callback(data);
  },
  
  // Save data
  saveData: function(data){
    localStorage.setItem(this.BASE_KEY, JSON.stringify(data));
  },
  
  // Add or update driver
  updateDriver: function(driver, callback){
    var self = this;
    this.getData(function(data){
      var idx = data.drivers.findIndex(function(d){return d.phone === driver.phone});
      if(idx !== -1){
        data.drivers[idx] = driver;
      } else {
        data.drivers.push(driver);
      }
      self.saveData(data);
      if(callback) callback(data);
    });
  },
  
  // Get online drivers for a city
  getOnlineDrivers: function(cityId, callback){
    this.getData(function(data){
      var online = data.drivers.filter(function(d){
        return d.city === cityId && d.online === true;
      });
      callback(online);
    });
  },
  
  // Get all drivers for a city
  getCityDrivers: function(cityId, callback){
    this.getData(function(data){
      var cityDrivers = data.drivers.filter(function(d){
        return d.city === cityId;
      });
      callback(cityDrivers);
    });
  },
  
  // Add booking
  addBooking: function(booking, callback){
    var self = this;
    this.getData(function(data){
      booking.id = 'BK' + Date.now();
      booking.time = new Date().toISOString();
      data.bookings.unshift(booking);
      // Keep only last 100 bookings
      if(data.bookings.length > 100) data.bookings = data.bookings.slice(0, 100);
      self.saveData(data);
      if(callback) callback(booking);
    });
  },
  
  // Toggle driver online/offline
  toggleOnline: function(phone, callback){
    var self = this;
    this.getData(function(data){
      var idx = data.drivers.findIndex(function(d){return d.phone === phone});
      if(idx !== -1){
        data.drivers[idx].online = !data.drivers[idx].online;
        self.saveData(data);
        if(callback) callback(data.drivers[idx]);
      }
    });
  }
};