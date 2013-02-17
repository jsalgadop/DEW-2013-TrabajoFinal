class District < ActiveRecord::Base
	has_many :users
	has_many :locals

	validates :name , :presence => true
	validates :name, :uniqueness => true
end
