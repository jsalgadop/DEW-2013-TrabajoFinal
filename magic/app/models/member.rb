class Member < ActiveRecord::Base
  belongs_to :tournament
  belongs_to :user

    validates :tournament_id, :presence => true
    validates :user_id, :presence => true
    validates :ganador, :presence => true 

   validates_uniqueness_of :tournament_id, :scope => :user_id

end
