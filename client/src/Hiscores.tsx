import { useState } from 'react'
import axios from 'axios'
import './Hiscores.css'

interface PlayerStats {
  id: number;
  username: string;
  displayName: string;
  type: string;
  build: string;
  combatLevel?: number;
  latestSnapshot?: {
    data: {
      skills: {
        [key: string]: {
          metric: string;
          experience: number;
          rank: number;
          level: number;
        }
      };
      bosses: {
        [key: string]: {
          metric: string;
          kills: number;
          rank: number;
          ehb: number;
        }
      };
      activities: {
        [key: string]: {
          metric: string;
          score: number;
          rank: number;
        }
      }
    }
  }
}

interface SkillData {
  skillName: string;
  experience: number;
  level: number;
  rank: number;
}

interface BossData {
  bossName: string;
  killCount: number;
  rank: number;
}

const SKILL_NAMES = [
  'overall', 'attack', 'defence', 'strength', 'hitpoints', 'ranged', 'prayer',
  'magic', 'cooking', 'woodcutting', 'fletching', 'fishing', 'firemaking',
  'crafting', 'smithing', 'mining', 'herblore', 'agility', 'thieving',
  'slayer', 'farming', 'runecrafting', 'hunter', 'construction'
];

const BOSS_NAMES = [
  'abyssal_sire', 'alchemical_hydra', 'artio', 'barrows_chests', 'bryophyta',
  'callisto', 'calvarion', 'cerberus', 'chambers_of_xeric', 'chambers_of_xeric_challenge_mode',
  'chaos_elemental', 'chaos_fanatic', 'commander_zilyana', 'corporeal_beast', 'crazy_archaeologist',
  'dagannoth_prime', 'dagannoth_rex', 'dagannoth_supreme', 'deranged_archaeologist', 'duke_sucellus',
  'general_graardor', 'giant_mole', 'grotesque_guardians', 'hespori', 'kalphite_queen',
  'king_black_dragon', 'kraken', 'kreearra', 'kril_tsutsaroth', 'mimic', 'nex',
  'nightmare', 'phosanis_nightmare', 'obor', 'phantom_muspah', 'sarachnis', 'scorpia',
  'skotizo', 'spindel', 'tempoross', 'the_gauntlet', 'the_corrupted_gauntlet', 'the_leviathan',
  'the_whisperer', 'theatre_of_blood', 'theatre_of_blood_hard_mode', 'thermonuclear_smoke_devil',
  'tombs_of_amascut', 'tombs_of_amascut_expert_mode', 'tzkal_zuk', 'tztok_jad', 'vardorvis',
  'venenatis', 'vetion', 'vorkath', 'wintertodt', 'zalcano', 'zulrah'
];

function Hiscores() {
  const [playerData, setPlayerData] = useState<PlayerStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState<string>('')
  const [selectedSkill, setSelectedSkill] = useState<string>('overall')
  const [selectedBoss, setSelectedBoss] = useState<string>('abyssal_sire')
  const [viewMode, setViewMode] = useState<'skills' | 'bosses'>('skills')
  const searchPlayer = async () => {
    if (!username.trim()) {
      setError('Please enter a username')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // First try to get the player data directly
      const response = await axios.get(`https://api.wiseoldman.net/v2/players/${username}`)
      setPlayerData(response.data)
      
      // Set initial boss selection to first boss with kills
      if (response.data?.latestSnapshot?.data?.bosses) {
        const firstBossWithKills = BOSS_NAMES.find(boss => {
          const bossData = response.data.latestSnapshot.data.bosses[boss]
          return bossData && bossData.kills > 0
        })
        if (firstBossWithKills) {
          setSelectedBoss(firstBossWithKills)
        }
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Player not found. Make sure the username is correct.')
      } else {
        setError('Failed to fetch player data. Please try again.')
      }
      console.error('Error fetching player data:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number): string => {
    return num.toLocaleString()
  }

  const getSkillIcon = (skill: string): string => {
    const icons: { [key: string]: string } = {
      overall: '⚔️', attack: '⚔️', defence: '🛡️', strength: '💪', hitpoints: '❤️',
      ranged: '🏹', prayer: '🙏', magic: '🔮', cooking: '🍳', woodcutting: '🪓',
      fletching: '🏹', fishing: '🎣', firemaking: '🔥', crafting: '🛠️',
      smithing: '⚒️', mining: '⛏️', herblore: '🧪', agility: '🏃', thieving: '👤',
      slayer: '💀', farming: '🌱', runecrafting: '🪄', hunter: '🦌', construction: '🏠'
    }
    return icons[skill] || '📊'
  }

  const getBossIcon = (boss: string): string => {
    const icons: { [key: string]: string } = {
      abyssal_sire: '👹', alchemical_hydra: '🐍', artio: '🐻', barrows_chests: '⚰️', bryophyta: '🌿',
      callisto: '🐻', calvarion: '💀', cerberus: '🐕', chambers_of_xeric: '🏛️', chambers_of_xeric_challenge_mode: '🏛️',
      chaos_elemental: '🌪️', chaos_fanatic: '😵', commander_zilyana: '👸', corporeal_beast: '👹', crazy_archaeologist: '🤪',
      dagannoth_prime: '🦕', dagannoth_rex: '🦖', dagannoth_supreme: '🦴', deranged_archaeologist: '😵', duke_sucellus: '👑',
      general_graardor: '⚔️', giant_mole: '🦔', grotesque_guardians: '🗿', hespori: '🌺', kalphite_queen: '🐛',
      king_black_dragon: '🐉', kraken: '🐙', kreearra: '🦅', kril_tsutsaroth: '👹', mimic: '📦', nex: '😈',
      nightmare: '😱', phosanis_nightmare: '👻', obor: '👹', phantom_muspah: '👻', sarachnis: '🕷️', scorpia: '🦂',
      skotizo: '💀', spindel: '🕸️', tempoross: '🌊', the_gauntlet: '⚔️', the_corrupted_gauntlet: '⚔️', the_leviathan: '🐋',
      the_whisperer: '👁️', theatre_of_blood: '🩸', theatre_of_blood_hard_mode: '🩸', thermonuclear_smoke_devil: '🌋',
      tombs_of_amascut: '🏺', tombs_of_amascut_expert_mode: '🏺', tzkal_zuk: '🔥', tztok_jad: '🔥', vardorvis: '⚡',
      venenatis: '🕷️', vetion: '💀', vorkath: '🐲', wintertodt: '❄️', zalcano: '⛏️', zulrah: '🐍'
    }
    return icons[boss] || '👹'
  }

  const formatBossName = (boss: string): string => {
    return boss.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const getSkillData = (skill: string): SkillData | null => {
    if (!playerData?.latestSnapshot?.data?.skills?.[skill]) return null
    
    const skillData = playerData.latestSnapshot.data.skills[skill]
    return {
      skillName: skill,
      experience: skillData.experience,
      level: skillData.level,
      rank: skillData.rank
    }
  }
  const getBossData = (boss: string): BossData | null => {
    if (!playerData?.latestSnapshot?.data?.bosses?.[boss]) return null
    
    const bossData = playerData.latestSnapshot.data.bosses[boss]
    
    // Skip bosses with -1 kills (not killed)
    if (bossData.kills === -1) return null
    
    return {
      bossName: boss,
      killCount: bossData.kills,
      rank: bossData.rank
    }
  }

  const renderSkillsGrid = () => {
    if (!playerData?.latestSnapshot?.data?.skills) return null

    return (
      <div className="skills-grid">
        {SKILL_NAMES.map(skill => {
          const skillData = getSkillData(skill)
          if (!skillData) return null

          return (
            <div 
              key={skill} 
              className={`skill-card ${selectedSkill === skill ? 'selected' : ''}`}
              onClick={() => setSelectedSkill(skill)}
            >
              <div className="skill-icon">{getSkillIcon(skill)}</div>
              <div className="skill-name">{skill.charAt(0).toUpperCase() + skill.slice(1)}</div>
              <div className="skill-level">Level {skillData.level}</div>
              <div className="skill-exp">{formatNumber(skillData.experience)} XP</div>
              <div className="skill-rank">Rank #{formatNumber(skillData.rank)}</div>
            </div>
          )
        })}
      </div>
    )
  }
  const renderBossesGrid = () => {
    if (!playerData?.latestSnapshot?.data?.bosses) return null

    const bossesWithData = BOSS_NAMES.filter(boss => {
      const bossData = playerData?.latestSnapshot?.data?.bosses?.[boss]
      return bossData && bossData.kills > 0 // Only show bosses with actual kills
    })

    if (bossesWithData.length === 0) {
      return (
        <div className="no-bosses">
          <p>No boss kill data found for this player.</p>
          <p>Player may not have killed any bosses yet or data hasn't been tracked.</p>
        </div>
      )
    }

    return (
      <div className="bosses-grid">
        {bossesWithData.map(boss => {
          const bossData = getBossData(boss)
          if (!bossData) return null

          return (
            <div 
              key={boss} 
              className={`boss-card ${selectedBoss === boss ? 'selected' : ''}`}
              onClick={() => setSelectedBoss(boss)}
            >
              <div className="boss-icon">{getBossIcon(boss)}</div>
              <div className="boss-name">{formatBossName(boss)}</div>
              <div className="boss-kills">{formatNumber(bossData.killCount)} KC</div>
              <div className="boss-rank">Rank #{formatNumber(bossData.rank)}</div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderSelectedSkillDetails = () => {
    const skillData = getSkillData(selectedSkill)
    if (!skillData) return null

    return (
      <div className="skill-details">
        <div className="skill-details-header">
          <div className="skill-icon-large">{getSkillIcon(selectedSkill)}</div>
          <div className="skill-details-info">
            <h3>{selectedSkill.charAt(0).toUpperCase() + selectedSkill.slice(1)}</h3>
            <div className="skill-stats">
              <div className="stat">
                <span className="stat-label">Level:</span>
                <span className="stat-value">{skillData.level}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Experience:</span>
                <span className="stat-value">{formatNumber(skillData.experience)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Rank:</span>
                <span className="stat-value">#{formatNumber(skillData.rank)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSelectedBossDetails = () => {
    const bossData = getBossData(selectedBoss)
    if (!bossData) return null

    return (
      <div className="boss-details">
        <div className="boss-details-header">
          <div className="boss-icon-large">{getBossIcon(selectedBoss)}</div>
          <div className="boss-details-info">
            <h3>{formatBossName(selectedBoss)}</h3>
            <div className="boss-stats">
              <div className="stat">
                <span className="stat-label">Kill Count:</span>
                <span className="stat-value">{formatNumber(bossData.killCount)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Rank:</span>
                <span className="stat-value">#{formatNumber(bossData.rank)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="hiscores-container">
      <div className="hiscores-header">
        <h1>📊 Player Stats</h1>
        <p>Search RuneScape player statistics via WiseOldMan API</p>
      </div>

      <div className="player-search">
        <div className="search-controls">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter RuneScape username..."
            onKeyPress={(e) => e.key === 'Enter' && searchPlayer()}
            className="username-input"
          />
          <button onClick={searchPlayer} disabled={loading} className="search-button">
            {loading ? '⏳' : '🔍'} Search
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {playerData && (
        <div className="player-info">
          <div className="player-header">
            <h2>{playerData.displayName}</h2>
            <div className="player-details">
              <span className="player-type">Type: {playerData.type}</span>
              <span className="player-build">Build: {playerData.build}</span>
              {playerData.combatLevel && (
                <span className="combat-level">Combat Level: {playerData.combatLevel}</span>
              )}
            </div>
          </div>

          <div className="view-mode-selector">
            <button 
              className={`mode-button ${viewMode === 'skills' ? 'active' : ''}`}
              onClick={() => setViewMode('skills')}
            >
              ⚔️ Skills
            </button>
            <button 
              className={`mode-button ${viewMode === 'bosses' ? 'active' : ''}`}
              onClick={() => setViewMode('bosses')}
            >
              👹 Boss Kills
            </button>
          </div>

          {viewMode === 'skills' && (
            <>
              <div className="skills-selector">
                <label htmlFor="skill-select">Select Skill:</label>
                <select
                  id="skill-select"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="skill-select"
                >
                  {SKILL_NAMES.map(skill => (
                    <option key={skill} value={skill}>
                      {skill.charAt(0).toUpperCase() + skill.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              {renderSelectedSkillDetails()}
              {renderSkillsGrid()}
            </>
          )}          {viewMode === 'bosses' && (
            <>
              <div className="bosses-selector">
                <label htmlFor="boss-select">Select Boss:</label>
                <select
                  id="boss-select"
                  value={selectedBoss}
                  onChange={(e) => setSelectedBoss(e.target.value)}
                  className="boss-select"
                >
                  {BOSS_NAMES.map(boss => {
                    const bossData = playerData?.latestSnapshot?.data?.bosses?.[boss]
                    const hasKills = bossData && bossData.kills > 0
                    return (
                      <option 
                        key={boss} 
                        value={boss}
                        disabled={!hasKills}
                      >
                        {formatBossName(boss)} {hasKills ? `(${formatNumber(bossData.kills)} KC)` : '(No kills)'}
                      </option>
                    )
                  })}
                </select>
              </div>
              {renderSelectedBossDetails()}
              {renderBossesGrid()}
            </>
          )}
        </div>
      )}

      {!playerData && !loading && !error && (
        <div className="no-player">
          <p>🎮 Enter a RuneScape username to view player statistics</p>
          <p>Data provided by <a href="https://wiseoldman.net" target="_blank" rel="noopener noreferrer">WiseOldMan</a></p>
        </div>
      )}
    </div>
  )
}

export default Hiscores
