class Tournament < ActiveRecord::Base
  belongs_to :local
  has_many :comments
  has_many :members
end
