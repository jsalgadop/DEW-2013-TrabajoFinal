class Local < ActiveRecord::Base
  belongs_to :district

    validates :name, :presence => true
    validates :address, :presence => true
    validates :telefono, :presence =>true
    validates :district_id, :presence =>true
    validates :name, :uniqueness => true

 geocoded_by :address
after_validation :geocode, :if => :address_changed?

end
