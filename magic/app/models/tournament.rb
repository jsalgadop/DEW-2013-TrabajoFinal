class Tournament < ActiveRecord::Base
  belongs_to :local
  has_many :members
  has_many :coments


    validates :name, :presence => true
    validates :cant_part, :presence => true
    validates :local_id, :presence =>true
    validates :fecha_hora, :presence =>true
    validates :estado, :presence =>true
    validates_uniqueness_of :fecha_hora, :scope => :local_id



end
